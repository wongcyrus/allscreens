import React from "react";
import { Auth } from 'aws-amplify';
import Webcam from "react-webcam";
import { Button } from 'semantic-ui-react';
import * as faceapi from 'face-api.js';
import API, { graphqlOperation } from '@aws-amplify/api';
import * as subscriptions from '../graphql/subscriptions';

const MODEL_URL = '/models';

export default class WebCam extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { webcamEnabled: false };
        this.state = {
            isStudent: false,
            webcamEnabled: false,
            preferredCameraDeviceId: "",
            skipCounter: 0
        };

        this.webcamRef = React.createRef();
        this.image = React.createRef();
        this.canvas = React.createRef();
    }

    async componentDidMount() {
        this._isMounted = true;

        const user = await Auth.currentAuthenticatedUser();
        const email = user.attributes.email;
        console.log(email);

        const group = user.signInUserSession.accessToken.payload["cognito:groups"][0];
        console.log(group);
        if (this._isMounted) {
            this.setState({ isStudent: "students" === group });
        }

        this.onCreateMessage = API.graphql(
            graphqlOperation(subscriptions.onCreateMessage, { email })
        ).subscribe({
            next: data => {
                const message = data.value.data.onCreateMessage;
                console.log(message);
                // window.postMessage(message.content);
            }
        });

        let devices = await window.navigator.mediaDevices.enumerateDevices();

        if (devices) {
            let webcam = devices.find(c => c.kind === "videoinput" && c.label.toLowerCase().includes("camera"));
            console.log(webcam);
            if (webcam && this._isMounted)
                this.setState({ preferredCameraDeviceId: webcam.deviceId });
        }

        await this.loadModels();
    }

    async loadModels() {
        try {
            await faceapi.loadFaceDetectionModel(MODEL_URL);
            await faceapi.loadFaceLandmarkModel(MODEL_URL);
        }
        catch (err) {
            console.error(err);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.onCreateMessage.unsubscribe();
        clearInterval(this.intervalId);
    }

    async captureWebcam() {
        const imageSrc = this.webcamRef.current.getScreenshot();
        this.image.current.src = imageSrc;

        if (this.state.skipCounter > 0) {
            this.setState({ skipCounter: this.state.skipCounter - 1 });
            window.postMessage({ VideoScreen2: imageSrc });
            return;
        }

        try {
            let detectionsWithLandmarks = await faceapi
                .detectAllFaces(this.image.current)
                .withFaceLandmarks();

            console.log(detectionsWithLandmarks);
            detectionsWithLandmarks = detectionsWithLandmarks.filter(c => c.detection.score > 0.6);

            if (detectionsWithLandmarks.length > 0) {
                const numberOfFace = detectionsWithLandmarks.length;
                console.log("With student!" + detectionsWithLandmarks.length);
                console.log(detectionsWithLandmarks);
                let ctx = this.canvas.current.getContext("2d");
                ctx.drawImage(this.image.current, 0, 0, 1280, 720);
                const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, { width: 1280, height: 720 });
                faceapi.draw.drawDetections(this.canvas.current, resizedResults);
                faceapi.draw.drawFaceLandmarks(this.canvas.current, resizedResults);
                let dataUrl = this.canvas.current.toDataURL();
                window.postMessage({ VideoScreen2: dataUrl });

                if (numberOfFace > 1) {
                    this.setState({ skipCounter: 10 });
                    window.postMessage("You have to work on your text alone!");
                }
            }
            else {
                console.log("No student!");
                window.postMessage({ VideoScreen2: imageSrc });
            }
        }
        catch (err) {
            console.error(err);
        }
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
                <div>
                    <Button onClick={this.disableWebcam}>
                        Disable webcam
                    </Button>
                    <Webcam
                        audio={false}
                        height={720}
                        ref={ this.webcamRef}
                        screenshotFormat="image/jpeg"
                        width={1280}
                        videoConstraints={videoConstraints}
                        className={"hiddenVideo"}
                     />
                    <img ref={this.image}  className={"hiddenVideo"} alt="webcam buffer screen."/>
                    <canvas ref={this.canvas} width={1280} height={720} className={"hiddenVideo"}/>
                </div>
            );
        else return (
            <div>
                <Button onClick={()=>this.enableWebcam()}>
                    Enable webcam
                </Button>
            </div>
        );
    }
}
