import React from "react";
import { Auth } from 'aws-amplify';
import { SumerianScene } from 'aws-amplify-react';


import API, { graphqlOperation } from '@aws-amplify/api';

import * as subscriptions from './graphql/subscriptions';

export default class VirtualTutor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isStudent: false };
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
                window.postMessage(message.content);
            }
        });
    }

    componentWillUnmount() {
        this.onCreateMessage.unsubscribe();
    }
    render() {
        if(this.state.isStudent)
            return (
                <SumerianScene sceneName="VirtualTutor" />
            );
        else return "";
    }
}
