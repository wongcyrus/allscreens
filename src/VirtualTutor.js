import React from "react";
import { Auth } from 'aws-amplify';
import { SumerianScene } from 'aws-amplify-react';


import API, { graphqlOperation } from '@aws-amplify/api';

import * as subscriptions from './graphql/subscriptions';

export default class VirtualTutor extends React.Component {

    constructor(props) {
        super(props);
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
                window.postMessage(message.content);
            }
        });
    }

    componentWillUnmount() {
        this.onCreateMessage.unsubscribe();
    }
    render() {
        return (
            <SumerianScene sceneName="VirtualTutor" muted={false}/>
        );
    }
}
