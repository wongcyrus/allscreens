import React from "react";
import { List } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import moment from "moment";

import * as subscriptions from '../graphql/subscriptions';

export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
                    const messages = [message, ...state.messages];
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

    render() {
        const MessageItems = this.state.messages.map(message =>
            <List.Item key={message.command + message.time} >
              <List.Icon name='envelope square' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>{message.command} {message.content}</List.Header>
                <List.Description as='a'>{moment(message.time).fromNow()}</List.Description>
              </List.Content>
            </List.Item>
        );
        return (
            <List divided relaxed>
                {MessageItems}
            </List>
        );
    }
}
