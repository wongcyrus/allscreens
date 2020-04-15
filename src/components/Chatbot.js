import React from 'react';
import { Predictions, Interactions, API, graphqlOperation, Auth } from 'aws-amplify';
import { Icon, Input, Button, Grid, Message } from 'semantic-ui-react';

import mic from 'microphone-stream';

import aws_exports from '../aws-exports';
import * as subscriptions from '../graphql/subscriptions';

export default class Chatbot extends React.Component {

  constructor(props) {
    super(props);

    const audioBuffer =
      (function() {
        let buffer = [];

        function add(raw) {
          buffer = buffer.concat(...raw);
          return buffer;
        }

        function newBuffer() {
          console.log("reseting buffer");
          buffer = [];
        }

        return {
          reset: function() {
            newBuffer();
          },
          addData: function(raw) {
            return add(raw);
          },
          getData: function() {
            return buffer;
          }
        };
      })();

    this.state = {
      audioBuffer: audioBuffer,
      stream: null,
      recording: false,
      micStream: null,
      sending: false,
      kendraIndexId: "",
      question: "",
      englishQuestion: "",
      reply: ""
    };
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    const email = user.attributes.email;
    console.log(email);

    this.onCreateScreenSharingTicketSubscription = API.graphql(
      graphqlOperation(subscriptions.onCreateScreenSharingTicket, { email })
    ).subscribe({
      next: data => {
        const ticket = data.value.data.onCreateScreenSharingTicket;
        this.setState({ kendraIndexId: ticket.kendraIndexId });
      }
    });
  }

  componentWillUnmount() {
    this.onCreateScreenSharingTicketSubscription.unsubscribe();
  }

  startRecording(event) {
    if (this.state.recording) return;
    console.log('start recording');
    this.state.audioBuffer.reset();

    window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      const startMic = new mic();

      startMic.setStream(stream);
      startMic.on('data', (chunk) => {
        var raw = mic.toRaw(chunk);
        if (raw == null) {
          return;
        }
        this.state.audioBuffer.addData(raw);

      });
      this.setState({
        recording: true,
        micStream: startMic
      });
    });

  }

  stopRecording(event) {
    if (!this.state.recording) return;
    console.log('stop recording');

    this.state.micStream.stop();
    this.setState({
      recording: false,
      micStream: null
    });

    const bytes = this.state.audioBuffer.getData();
    Predictions.convert({
        transcription: {
          source: {
            bytes
          },
          language: "en-US"
        },
      }).then(({
        transcription: { fullText }
      }) => {
        this.setState({ englishQuestion: fullText });
        this.setState({ question: fullText });
        this.sendChatMessage();
      })
      .catch(err => console.error(err));
  }

  async sendChatMessage(event) {
    let message = this.state.question;
    //Translate if click send botton.
    let sourceLanguage;
    if (event) {
      let language = await Predictions.interpret({
        text: {
          source: {
            text: this.state.question,
          },
          type: "LANGUAGE"
        }
      });
      sourceLanguage = language.textInterpretation.language;
      if (!sourceLanguage.startsWith("en")) {
        const translatedMessage = await Predictions.convert({
          translateText: {
            source: {
              text: this.state.question,
              language: sourceLanguage
            },
            targetLanguage: "en"
          }
        });
        message = translatedMessage.text;
        this.setState({ englishQuestion: message });
        console.log(this.state.question, message);
      }
    }
    this.setState({ sending: true });
    const response = await Interactions.send(aws_exports.aws_bots_config[0].name, message);

    if (response.intentName) {
      let responseMessage = response.message;
      console.log(responseMessage);

      let result = await Predictions.interpret({
        text: {
          source: {
            text: responseMessage,
          },
          type: "ALL"
        }
      });
      console.log(sourceLanguage);
      if (sourceLanguage && !sourceLanguage.startsWith("en")) {
        console.log("Translate " + responseMessage + " to " + sourceLanguage);
        const translatedMessage = await Predictions.convert({
          translateText: {
            source: {
              text: responseMessage,
              language: "en"
            },
            targetLanguage: sourceLanguage
          }
        });
        console.log(translatedMessage.text);
        this.setState({ reply: `${responseMessage} (${translatedMessage.text})` });
      }
      else {
        this.setState({ reply: responseMessage });
      }

      const sentiment = result.textInterpretation.sentiment.predominant;
      console.log(sentiment);
      switch (sentiment) {
        case "POSITIVE":
          responseMessage = this.addGesture("heart", responseMessage);
          break;
        case "NEGATIVE":
          responseMessage = this.addGesture("defense", responseMessage);
          break;
        case "NEUTRAL":
          responseMessage = this.addGesture("self", responseMessage);
          break;
        case "MIXED":
          responseMessage = this.addGesture("movement", responseMessage);
          break;
        default:
          break;
      }
      window.postMessage(responseMessage);
    }
    else {
      console.log(this.state.kendraIndexId);
      if (this.state.kendraIndexId && this.state.kendraIndexId !== "null") {
        window.postMessage("Let me check your question with kendra!");
        let answer = await this.getAnswerFromKendra(this.state.kendraIndexId, message);
        console.log(answer);
        this.setState({ reply: answer.message });
        window.postMessage(answer.foundAnswer ?
          this.addGesture("aggressive", answer.message) :
          this.addGesture("in", answer.message));
      }
      else {
        window.postMessage(this.addGesture("in", "Sorry I don't know and please ask your teacher."));
      }
    }
  }

  addGesture(gesture, message) {
    return `<mark name="gesture:${gesture}"/>${message}<break time="1000ms"/>`;
  }

  async getAnswerFromKendra(kendraIndexId, question) {
    let path = '/search';
    let myInit = {
      headers: { 'Content-Type': 'application/json' },
      queryStringParameters: { // OPTIONAL
        kendraIndexId,
        question
      }
    };
    let data = await API.get("kendraApi", path, myInit);
    await new Promise(r => setTimeout(r, 3000));
    if (data.result && data.result.ResultItems[0]) {
      let title = data.result.ResultItems[0].DocumentTitle.Text;
      let text = data.result.ResultItems[0].DocumentExcerpt.Text;

      const removeHtml = text => {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || "";
      };
      text = removeHtml(text);

      return { foundAnswer: true, message: `You can check ${title} and ,in summary, ${text}.` };
    }
    return { foundAnswer: true, message: 'We cannot get the answer for you and please Google it or ask your teacher!' };
  }

  updateChatMessage(event) {
    this.setState({ question: event.target.value });
  }

  render() {
    return (
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
             <Icon name='microphone' size='big'           
                onTouchStart={()=>this.stopRecording()}
                onTouchEnd={()=>this.startRecording()}
                onMouseDown={()=>this.startRecording()}
                onMouseUp={()=>this.stopRecording()}
                onMouseLeave={()=>this.stopRecording()} />
            {this.state.recording && <Icon name='record' size='big' /> }
            <Input placeholder="Message" className="chatmessage" 
                onChange={(event)=>this.updateChatMessage(event)}/>
            <Button onClick={(event)=>this.sendChatMessage(event)} >Ask</Button>
            <Message>{this.state.englishQuestion}</Message>
          </Grid.Column>
          <Grid.Column>
            <Message>{this.state.reply}</Message>  
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
