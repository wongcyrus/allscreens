import React from 'react';
import { Predictions, Interactions } from 'aws-amplify';
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
    console.log(this.state.fullText);
    this.setState({ sending: true });
    const response = await Interactions.send(aws_exports.aws_bots_config.name, this.state.fullText);

    console.log(response);
    window.postMessage(response.message);
  }

  updateChatMessage(event) {
    console.log(event.target.value);
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
          <Button onClick={()=>this.sendChatMessage()} >Send</Button>
          {this.state.fullText}
      </div>
    );
  }
}
