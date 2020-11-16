import React from "react";

import { Segment, Grid, Button, Confirm } from 'semantic-ui-react';

import { Auth, Storage } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';

import * as subscriptions from '../graphql/subscriptions';
import WebCam from "./WebCam";

// Source from https://webrtc.github.io/samples/src/content/getusermedia/getdisplaymedia/js/main.js
export default class ScreenSharing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enableStartCapture: false,
            enableStopCapture: false,
            stream: null,
            chunks: [],
            status: 'Inactive',
            recording: null,
            ticket: null,
            open: false
        };

        this.screen = React.createRef();
        this.imageView = React.createRef();

    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();
        const email = user.attributes.email;

        this.onCreateScreenSharingTicketSubscription = API.graphql(
            graphqlOperation(subscriptions.onCreateScreenSharingTicket, { email })
        ).subscribe({
            next: data => {
                const ticket = data.value.data.onCreateScreenSharingTicket;
                console.log(ticket);
                this.setState({ ticket });
                this.setState({ enableStartCapture: true });
                if (this.state.stream == null) {
                    window.postMessage("Please share your webcam or screen to me.");
                }
            }
        });
        console.log("ScreenSharing componentDidMount " + email);
    }

    componentWillUnmount() {
        this.onCreateScreenSharingTicketSubscription.unsubscribe();
        clearInterval(this.timer);
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
            enableStopCapture: true
        });

        if (this.state.recording) {
            window.URL.revokeObjectURL(this.state.recording);
        }

        this.setState({
            chunks: [],
            recording: null
        });

        ScreenSharing._startScreenCapture()
            .then(stream => {
                stream.addEventListener('inactive', e => {
                    console.log('Capture stream inactive - stop recording!');
                    this._stopCapturing(e);
                });

                this.screen.current.srcObject = stream;
                this.setState({
                    stream: stream
                });

                this.timer = setInterval(() => {

                    if (this.state.ticket !== null) {
                        const now = new Date();
                        const endDate = new Date(this.state.ticket.activeUntil);
                        const withValidTicket = (endDate.getTime() - now.getTime()) > 0;
                        console.log("withValidTicket", withValidTicket);
                        if (!withValidTicket) return;

                        let canvas = document.createElement("canvas");
                        let video = this.screen.current;
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                        this.imageView.current.setAttribute('src', canvas.toDataURL());

                        window.postMessage({ VideoScreen1: canvas.toDataURL() });
                        Storage.put("upload/" + this.state.ticket.email + "/screenshot.txt", canvas.toDataURL())
                            .then(result => console.log(result))
                            .catch(err => console.log(err));
                    }
                }, 5000);
            });

    }

    _stopCapturing(e) {
        console.log('Stop capturing.');
        clearInterval(this.timer);

        this.setState({
            status: 'Screen recorded completed.',
            enableStartCapture: true,
            enableStopCapture: false
        });

        this.setState((state) => {
            console.log(state);
            if (state.stream !== null)
                state.stream.getTracks().forEach(track => track.stop());
            return {
                stream: null
            };
        });
    }

    show = () => this.setState({ open: true })
    handleConfirm = () => {
        this.setState({ open: false });
        this._startCapturing();
    }
    handleCancel = () => this.setState({ open: false })

    render() {
        const { open } = this.state;
        return (
            <Segment>
                <Grid>
                    <img ref={this.imageView} style={{display: 'none' }} alt="Right click to save" />
                    <video ref={this.screen} autoPlay style={{display: 'none' }}></video>
                    <div>
                        Status: {this.state.status}
                        <Button disabled = {!this.state.enableStartCapture} onClick={this.show}>Start screen sharing</Button>
                        <Button disabled = {!this.state.enableStopCapture} onClick={() => this._stopCapturing()}>Stop screen sharing</Button>
                    </div>
                    <WebCam mode="alone" text="Work Alone" rate="1"/>
                    <WebCam mode="mask" text="Face Mask Detection" rate="1"/>
                </Grid>
        <Confirm
          open={open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="Your screen will share to your teacher. Are you sure?"
        />
            </Segment>
        );
    }
}
