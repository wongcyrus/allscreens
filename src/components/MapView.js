import React from "react";
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import { Auth } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import { S3Image } from 'aws-amplify-react';
import GoogleMapReact from 'google-map-react';
import { geolocated } from "react-geolocated";
import moment from "moment";

import * as subscriptions from '../graphql/subscriptions';

class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coords: props.coords,
            messages: [],
            modalLargeViewOpen: false,
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

    handleClick(email) {
        let fullSizeKey = "fullsize/" + email + "/webcam.png";
        this.setState({ fullSizeKey, email });
        this.setState({ modalLargeViewOpen: true });
    }

    render() {
        const Marker = ({ text, imgKey, lat, lng, from }) =>
            <div
                style={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <S3Image 
                    level="public" 
                    imgKey={"resized/" + from + "/webcam.png"} 
                    theme={{
                        photoImg: { maxWidth: "100px" }
                    }}
                    onClick={()=>this.handleClick(from)}
                />
            </div>;

        const markerItems = this.state.messages
            .map(message => ({
                message,
                lat: JSON.parse(message.command).data.latitude,
                lng: JSON.parse(message.command).data.longitude
            }))
            .map(({ message, lat, lng }) =>
                <Marker
                    key = { message.command + message.time }
                    lat = {lat}
                    lng = {lng}
                    text = { message.command }
                    from = { message.from }
                />
            );
        console.log(markerItems);
        if (this.props.coords) {
            let center = {
                lat: this.props.coords.latitude || 0,
                lng: this.props.coords.longitude || 0
            };
            console.log("center", center);
            return (
                <div style={{ height: '70vh', width: '100%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: "AIzaSyCgHP4b57aXthnugLON0PtM7VdajVpUh3s" }}
                      defaultCenter={center}
                      defaultZoom={12}
                      onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
                           yesIWantToUseGoogleMapApiInternals
                     >
                        {markerItems}
                    </GoogleMapReact>
                    <Modal
                        open={this.state.modalLargeViewOpen}
                        onClose={() => this.setState({ modalLargeViewOpen: false })}
                        closeIcon
                        size='fullscreen'
                    >
                        <Header icon='browser' content={this.state.email} />
                        <Modal.Content>
                            <S3Image 
                                level="public" 
                                imgKey={this.state.fullSizeKey} 
                                theme={{
                                    photoImg: { maxWidth: "80%", maxHeight: "60%" }
                                }}
                            />
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> Close it
                          </Button>
                        </Modal.Actions>
                    </Modal>
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
