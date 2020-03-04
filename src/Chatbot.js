import React from 'react';
import { Predictions, Interactions, API } from 'aws-amplify';
import { Icon, Input, Button } from 'semantic-ui-react';

import mic from 'microphone-stream';

import aws_exports from './aws-exports';

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
      sending: false
    };
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
        this.setState({ fullText });
        this.sendChatMessage();
      })
      .catch(err => console.error(err));
  }

  async sendChatMessage(event) {
    let message = this.state.fullText;
    //Translate if click send botton.
    if (event) {

      let language = await Predictions.interpret({
        text: {
          source: {
            text: this.state.fullText,
          },
          type: "LANGUAGE"
        }
      });
      let sourceLanguage = language.textInterpretation.language;
      if (!sourceLanguage.startsWith("en")) {
        const translatedMessage = await Predictions.convert({
          translateText: {
            source: {
              text: this.state.fullText,
              sourceLanguage
            },
            targetLanguage: "en"
          }
        });
        message = translatedMessage.text;
        console.log(this.state.fullText, message);
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
      const sentiment = result.textInterpretation.sentiment.predominant;
      console.log(sentiment);
      switch (sentiment) {
        case "POSITIVE":
          responseMessage = '<mark name="gesture:heart"/>' + responseMessage + '<break time="1000ms"/>';
          break;
        case "NEGATIVE":
          responseMessage = '<mark name="gesture:defense"/>' + responseMessage + '<break time="1000ms"/>';
          break;
        case "NEUTRAL":
          responseMessage = '<mark name="gesture:self"/>' + responseMessage + '<break time="1000ms"/>';
          break;
        case "MIXED":
          responseMessage = '<mark name="gesture:movement"/>' + responseMessage + '<break time="1000ms"/>';
          break;
        default:
          break;
      }
      window.postMessage(responseMessage);
    }
    else {
      window.postMessage("Let me check your question with kendra!");
      let answer = await this.getAnswerFromKendra(message);
      console.log(answer);
      window.postMessage(answer);
    }
  }

  async getAnswerFromKendra(question) {
    let path = '/search';
    let myInit = {
      headers: { 'Content-Type': 'application/json' },
      queryStringParameters: { // OPTIONAL
        question
      }
    };
    let data = await API.get("kendraApi", path, myInit);
    await new Promise(r => setTimeout(r, 3000));
    if (data.result.ResultItems[0]) {
      let title = data.result.ResultItems[0].DocumentTitle.Text;
      let text = data.result.ResultItems[0].DocumentExcerpt.Text;

      const removeHtml = text => {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = text;
        return tmp.textContent || tmp.innerText || "";
      };
      text = removeHtml(text);

      return `You can check ${title} and ,in short, ${text}.`;
    }
    return '<mark name="gesture:in"/>We cannot get the answer for you and please Google it or ask your teacher!<break time="1000ms"/>';
  }

  updateChatMessage(event) {
    this.setState({ fullText: event.target.value });
  }

  render() {
    return (
      <div>
         <Icon name='microphone' size='big'           
              onTouchStart={()=>this.stopRecording()}
              onTouchEnd={()=>this.startRecording()}
              onMouseDown={()=>this.startRecording()}
              onMouseUp={()=>this.stopRecording()}
              onMouseLeave={()=>this.stopRecording()} />
          {this.state.recording && <Icon name='record' size='big' /> }
          <Input placeholder="Message" className="chatmessage" 
              onChange={(event)=>this.updateChatMessage(event)}/>
          <Button onClick={(event)=>this.sendChatMessage(event)} >Send</Button>
          {this.state.fullText}
      </div>
    );
  }
}
