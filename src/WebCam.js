import React from "react";
import { Auth } from 'aws-amplify';
import Webcam from "react-webcam";
import { Button, Grid } from 'semantic-ui-react';

import API, { graphqlOperation } from '@aws-amplify/api';

import * as subscriptions from './graphql/subscriptions';

export default class WebCam extends React.Component {

    constructor(props) {
        super(props);
        this.state = { webcamEnabled: false };
        this.state = {
            isStudent: false,
            webcamEnabled: false,
            preferredCameraDeviceId: ""
        };

        this.webcamRef = React.createRef();
    }

    async componentWillMount() {
        let devices = await window.navigator.mediaDevices.enumerateDevices();

        if (devices) {
            let webcam = devices.find(c => c.kind === "videoinput" && c.label.toLowerCase().includes("camera"));
            console.log(webcam);
            if (webcam)
                this.setState({ preferredCameraDeviceId: webcam.deviceId });
        }

    }


    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();
        const email = user.attributes.email;
        console.log(email);

        const group = user.signInUserSession.accessToken.payload["cognito:groups"][0];
        console.log(group);
        this.setState({ isStudent: "students" === group });

        this.onCreateMessage = API.graphql(
            graphqlOperation(subscriptions.onCreateMessage, { email })
        ).subscribe({
            next: data => {
                const message = data.value.data.onCreateMessage;
                console.log(message);
                // window.postMessage(message.content);
            }
        });
    }

    componentWillUnmount() {
        this.onCreateMessage.unsubscribe();
        clearInterval(this.intervalId);
    }

    captureWebcam() {
        const imageSrc = this.webcamRef.current.getScreenshot();
        window.postMessage({ VideoScreen2: imageSrc });
    }
    enableWebcam = () => {
        this.setState({ webcamEnabled: true });
        this.intervalId = setInterval(this.captureWebcam.bind(this), 1000);
    }

    disableWebcam = () => {
        this.setState({ webcamEnabled: false });
        clearInterval(this.intervalId);
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            deviceId: this.state.preferredCameraDeviceId
        };

        if (!this.state.isStudent) return "";

        if (this.state.webcamEnabled)
            return (
                <Grid>
                    <Webcam
                        audio={false}
                        height={720}
                        ref={ this.webcamRef}
                        screenshotFormat="image/jpeg"
                        width={1280}
                        videoConstraints={videoConstraints}
                        className={"hiddenVideo"}
                     />
                    <Button onClick={this.disableWebcam}>
                        Disable webcam
                    </Button>
                </Grid>
            );
        else return (
            <Grid>
                <Button onClick={this.enableWebcam}>
                    Enable webcam
                </Button>
            </Grid>
        );
    }
}
