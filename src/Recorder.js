import React from 'react';
import { Predictions } from 'aws-amplify';

import mic from 'microphone-stream';


export default class Recorder extends React.Component {

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
            micStream: null
        };
    }

    startRecording() {
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

    stopRecording() {
        console.log('stop recording');

        this.state.micStream.stop();
        this.setState({
            recording: false,
            micStream: null
        });

        const bytes = this.state.audioBuffer.getData();
        console.log(bytes);

        Predictions.convert({
                transcription: {
                    source: {
                        bytes
                    },
                    language: "en-US"
                },
            }).then((a) => console.log(a))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
          {this.state.recording && <button onClick={()=>this.stopRecording()}>Stop recording</button>}
          {!this.state.recording && <button onClick={()=>this.startRecording()}>Start recording</button>}
        </div>
        );
    }
}
