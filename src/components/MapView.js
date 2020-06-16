import React from "react";

import { Auth } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import { S3Image } from 'aws-amplify-react';
import GoogleMapReact from 'google-map-react';
import Marker from 'google-map-react';
import { geolocated } from "react-geolocated";
import moment from "moment";

import * as subscriptions from '../graphql/subscriptions';

class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coords: props.coords,
            messages: []
        };
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();
        const email = user.attributes.email;
        console.log(email);

        this.onCreateMessage = API.graphql(
            graphqlOperation(subscriptions.onCreateMessage, { email })
        ).subscribe({
            next: data => {
                const message = data.value.data.onCreateMessage;
                console.log(message);
                this.setState(state => {
                    message.time = Date.now();
                    const messages = [message, ...state.messages].filter(m => moment().diff(m.time, 'seconds') < 10);
                    return {
                        messages
                    };
                });
            }
        });
    }

    componentWillUnmount() {
        this.onCreateMessage.unsubscribe();
    }

    _onBoundsChange = (center, zoom) => {
        this.setState(state => {
            return {
                center: { lat: center[0], lng: center[1] }
            };
        });
        console.log(this.state.center, zoom);
    }
    render() {

        const markerStyle = {
            border: '1px solid white',
            borderRadius: '50%',
            height: 10,
            width: 10,
            cursor: 'pointer',
            zIndex: 10,
        };
        const AnyReactComponent = ({ text, imgKey, center }) => <div style={markerStyle} > 
                            <S3Image 
                                level="public" 
                                imgKey={imgKey} 
                                theme={{
                                    photoImg: { maxWidth: "100px" }
                                }}
                            />{text+JSON.stringify(center)}</div>;

        const markerItems = this.state.messages.map(message =>
            <div>
            <AnyReactComponent
                    key={message.command + message.time}
                    lat={JSON.parse(message.command).latitude}
                    lng={JSON.parse(message.command).longitude}
                    text={message.content}
                    center = {this.state.center}
                    imgKey={"resized/" + message.from + "/webcam.png"}
                  />
            </div>
        );
        console.log(markerItems);
        if (this.props.coords) {
            let center = {
                lat: this.props.coords.latitude || 0,
                lng: this.props.coords.longitude || 0
            };
            return (
                <div style={{ height: '100vh', width: '70%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyCgHP4b57aXthnugLON0PtM7VdajVpUh3s" }}
                  defaultCenter={center}
                  defaultZoom={12}
                  onBoundsChange={this._onBoundsChange}
                >
                  {markerItems}
                </GoogleMapReact>
            </div>
            );
        }
        else return ("");
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(MapView);
