import React from "react"

// Source from https://webrtc.github.io/samples/src/content/getusermedia/getdisplaymedia/js/main.js
export default class ScreenSharing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enableStartCapture: true,
            enableStopCapture: true,
            enableDownloadRecording: false,
            stream: null,
            chunks: [],
            mediaRecorder: null,
            status: 'Inactive',
            recording: null
        };

        this.downloadLink = React.createRef();

    }


    static _startScreenCapture() {
        if (window.navigator.getDisplayMedia) {
            return window.navigator.getDisplayMedia({ video: true });
        }
        else if (window.navigator.mediaDevices.getDisplayMedia) {
            return window.navigator.mediaDevices.getDisplayMedia({ video: true });
        }
        else {
            return window.navigator.mediaDevices.getUserMedia({ video: { mediaSource: 'screen' } });
        }
    }

    _startCapturing(e) {
        console.log('Start capturing.');

        this.setState({
            status: 'Screen recording started.',
            enableStartCapture: false,
            enableStopCapture: true,
            enableDownloadRecording: false,
        });

        if (this.state.recording) {
            window.URL.revokeObjectURL(this.state.recording);
        }

        this.setState({
            chunks: [],
            recording: null
        });

        ScreenSharing._startScreenCapture().then(stream => {
            stream.addEventListener('inactive', e => {
                console.log('Capture stream inactive - stop recording!');
                this._stopCapturing(e);
            });

            let mediaRecorder = new window.MediaRecorder(stream, { mimeType: 'video/webm' });
            let that = this;
            mediaRecorder.addEventListener('dataavailable', event => {
                if (event.data && event.data.size > 0) {
                    that.setState((state) => {
                        state.chunks.push(event.data);
                        return { chunks: state.chunks };
                    });
                }
            });
            mediaRecorder.start(10);
            this.setState({
                stream: stream,
                mediaRecorder: mediaRecorder
            });
        });
    }

    _stopCapturing(e) {
        console.log('Stop capturing.');

        this.setState({
            status: 'Screen recorded completed.',
            enableStartCapture: true,
            enableStopCapture: false,
            enableDownloadRecording: true
        });

        this.setState((state) => {
            console.log(state);
            if (state.mediaRecorder !== null)
                state.mediaRecorder.stop();
            if (state.stream !== null)
                state.stream.getTracks().forEach(track => track.stop());
            return {
                mediaRecorder: null,
                stream: null,
                recording: window.URL.createObjectURL(new window.Blob(state.chunks, { type: 'video/webm' }))
            };
        });
    }

    _downloadRecording(e) {
        console.log('Download recording.');
        this.setState({
            enableStartCapture: true,
            enableStopCapture: false,
            enableDownloadRecording: false
        });
        this.downloadLink.current.click();
    }

    onProgress = ({ nativeEvent: { lengthComputable, total, loaded } }) => {
        console.log(lengthComputable, total, loaded);
    }

    render() {
        console.log('render');
        return (
            <div>
                <video controls={this.state.recording !== null} playsInline autoPlay loop muted src={this.state.recording}></video>
                <p>Status: {this.state.status}</p>
                <button disabled = {(!this.state.enableStartCapture)? "disabled" : ""} onClick={() => this._startCapturing()}>Start screen Sharing</button>
                <button disabled = {(!this.state.enableStopCapture)? "disabled" : ""} onClick={() => this._stopCapturing()}>Stop screen Sharing</button>
                <button disabled = {(!this.state.enableDownloadRecording)? "disabled" : ""} onClick={() => this._downloadRecording()}>Download recording</button>
                <a ref={this.downloadLink} href={this.state.recording} type="video/webm" style={{display: 'none'}} download='screen-recording.webm' onProgress={this.onProgress} />
            </div>
        );
    }
}
