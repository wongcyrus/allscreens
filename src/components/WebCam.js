import React from "react";
import { Auth, Storage } from 'aws-amplify';
import Webcam from "react-webcam";
import { Button } from 'semantic-ui-react';
import * as faceapi from 'face-api.js';
import API, { graphqlOperation } from '@aws-amplify/api';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { geolocated } from "react-geolocated";

const MODEL_URL = '/models';

class WebCam extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { webcamEnabled: false };
        this.state = {
            isStudent: false,
            webcamEnabled: false,
            preferredCameraDeviceId: "",
            skipCounter: 0,
            email: "",
            ticket: null,
            enableWebcamSharingButton: false
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

        this.setState({ email });

        const group = user.signInUserSession.accessToken.payload["cognito:groups"][0];
        console.log(group);
        if (this._isMounted) {
            this.setState({ isStudent: "students" === group });
        }

        this.onCreateScreenSharingTicketSubscription = API.graphql(
            graphqlOperation(subscriptions.onCreateScreenSharingTicket, { email })
        ).subscribe({
            next: data => {
                const ticket = data.value.data.onCreateScreenSharingTicket;

                console.log(ticket);
                this.setState({ enableWebcamSharingButton: true });
                this.setState({ ticket });
            }
        });

        let devices = await window.navigator.mediaDevices.enumerateDevices();

        if (devices) {
            let webcam = devices.find(c => c.kind === "videoinput" && c.label.toLowerCase().includes("camera"));
            console.log(devices);
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
        this.onCreateScreenSharingTicketSubscription.unsubscribe();
        clearInterval(this.intervalId);
    }

    async postImage(dataUrl) {
        const apiName = 'facemaskApi';
        const path = '/images';
        const myInit = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: { dataUrl }
        };
        return await API.post(apiName, path, myInit);
    }
    async captureWebcam() {
        const imageSrc = this.webcamRef.current.getScreenshot();
        this.image.current.src = imageSrc;

        if (this.state.skipCounter > 0) {
            this.setState({ skipCounter: this.state.skipCounter - 1 });
            window.postMessage({ VideoScreen2: imageSrc });
            return;
        }

        let createMessage = async(to, from, content, command) => await API.graphql(graphqlOperation(mutations.createMessage, {
            input: {
                email: to,
                from,
                content,
                command
            }
        }));
        if (this.props.mode === "mask") {
            const data = await this.postImage(imageSrc);
            window.postMessage({ VideoScreen2: imageSrc });

            console.log("noMask", data);

            if (data.noMask) {
                this.setState({ skipCounter: 3 });
                window.postMessage("Please wear your mask!");
                const command = { action: "Alert", data: { type: "NoMask", latitude: this.props.coords.latitude, longitude: this.props.coords.longitude } };
                console.log(command);
                createMessage(this.state.ticket.teacherEmail, this.state.email, "No Mask", JSON.stringify(command));
            }

            Storage.put("upload/" + this.state.email + "/webcam.txt", imageSrc)
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
        else if (this.props.mode === "alone") {
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
                        window.postMessage("Please keep your social distance!");
                        const command = { action: "Alert", data: { type: "Cheating", latitude: this.props.coords.latitude, longitude: this.props.coords.longitude } };
                        createMessage(this.state.ticket.teacherEmail, this.state.email, "Cheating", JSON.stringify(command));
                        Storage.put("upload/" + this.state.email + "/webcam.txt", imageSrc)
                            .then(result => console.log(result))
                            .catch(err => console.log(err));
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

    }
    enableWebcam = () => {
        this.setState({ webcamEnabled: true });
        this.intervalId = setInterval(this.captureWebcam.bind(this), this.props.rate * 1000);
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
                        Disable Webcam {this.props.text}
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
                <Button onClick={()=>this.enableWebcam()} disabled = {!this.state.enableWebcamSharingButton}>
                    Enable Webcam {this.props.text}
                </Button>
                {!this.props.isGeolocationAvailable?("Your browser does not support Geolocation"):("")}
                {!this.props.isGeolocationEnabled?("Geolocation is not enabled"):("")}
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(WebCam);
