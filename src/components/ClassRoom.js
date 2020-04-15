import React from 'react';
import { Auth } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import { Button, Header, Segment, Form, List, Divider } from 'semantic-ui-react';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

export default class ClassRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", email: "", kendraIndexId: "", classrooms: [] };
        this.name = React.createRef();
        this.kendraIndexId = React.createRef();
        this.emails = React.createRef();
    }


    async componentDidMount() {
        const { username } = await Auth.currentAuthenticatedUser();

        let { data } = await API.graphql(graphqlOperation(queries.listClassRooms, { owner: username }));
        console.log(data);
        this.setState({ classrooms: data.listClassRooms.items });

        this.onDeleteClassRoomSubscription = API.graphql(
            graphqlOperation(subscriptions.onDeleteClassRoom, { owner: username })
        ).subscribe({
            next: data => {
                console.log(data);
                const classroom = data.value.data.onDeleteClassRoom;
                const classrooms = [
                    ...this.state.classrooms.filter(r => {
                        return r.name !== classroom.name;
                    })
                ];
                this.setState({ classrooms });
            }
        });

        this.onCreateClassRoomSubscription = API.graphql(
            graphqlOperation(subscriptions.onCreateClassRoom, { owner: username })
        ).subscribe({
            next: data => {
                console.log(data);
                const classroom = data.value.data.onCreateClassRoom;
                const classrooms = [
                    ...this.state.classrooms,
                    classroom
                ];
                this.setState({ classrooms });
            }
        });
    }

    componentWillUnmount() {
        this.onDeleteClassRoomSubscription.unsubscribe();
        this.onCreateClassRoomSubscription.unsubscribe();
    }

    handleChange = (e, { name, value }) => this.setState({
        [name]: value
    })

    handleSubmit = async(event) => {
        event.preventDefault();
        try {
            let { name, kendraIndexId, emails } = this.state;

            kendraIndexId = kendraIndexId || "null";

            console.log({ name, kendraIndexId, emails });
            const emailsList = emails.split("\n");

            if (this.state.classrooms.find(c => c.name === name)) {
                let result = await API.graphql(graphqlOperation(mutations.updateClassRoom, {
                    input: {
                        name,
                        kendraIndexId,
                        studentEmails: emailsList
                    }
                }));
                console.log(result);
            }
            else {
                let result = await API.graphql(graphqlOperation(mutations.createClassRoom, {
                    input: {
                        name,
                        kendraIndexId,
                        studentEmails: emailsList
                    }
                }));
                console.log(result);
            }

        }
        catch (err) {
            console.error(err);
        }
        this.setState({ name: '', description: '', emails: '' });
    };

    onDeleteClick = async(event) => {
        event.preventDefault();
        console.log(event.target.text);
        let name = event.target.text;
        let result = await API.graphql(graphqlOperation(mutations.deleteClassRoom, {
            input: {
                name
            }
        }));
        console.log(result);
    }

    render() {
        const { classrooms } = this.state;

        const ClassRoomItems = classrooms.map(item =>
            <List.Item 
                key={item.name} 
                as='a'
                onClick={this.onDeleteClick}
            >
            {item.name}
            </List.Item>
        );
        const ListClassRoom = () => (classrooms.length > 0 ? (
            <div>
                <Divider section />
                <Header as='h3'>Click to delete the classroom:</Header>
                <List>
                    {ClassRoomItems}
                </List>
            </div>
        ) : "");

        return (
            <Segment>
              <Header as='h3'>Create or Update a new Classroom</Header>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                  <Form.Input 
                    name='name' 
                    label='Name' 
                    placeholder='Name' 
                    value={this.state.name} 
                    fluid
                    required  
                    onChange={this.handleChange}/>
                  <Form.Input 
                    name='kendraIndexId' 
                    label='Kendra Index ID (Optional)' 
                    placeholder='Kendra Index ID' 
                    value={this.state.kendraIndexId} 
                    fluid
                    onChange={this.handleChange}/>                    
                </Form.Group>
                <Form.TextArea 
                    name='emails' 
                    label='Student Emails' 
                    placeholder='Each student email per line' 
                    value={this.state.emails} 
                    required  
                    onChange={this.handleChange}/>
                <Button type='submit'>Submit</Button>
              </Form>
              <ListClassRoom/>
              
            </Segment>
        );
    }

}
