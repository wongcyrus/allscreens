import React from "react";
import { Auth, Storage } from 'aws-amplify';
import { S3Album, S3Image } from 'aws-amplify-react';
import { Button, Header, Icon, Modal, Container, Segment, Form } from 'semantic-ui-react';

import API, { graphqlOperation } from '@aws-amplify/api';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

import OnlineReport from './OnlineReport';
import CallOuts from "./CallOuts";
import CallQuzz from "./CallQuzz";
import Message from "./Message";

export default class AllScreenView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalLargeViewOpen: false,
            modalQuestionViewOpen: false,
            count: 0,
            referesh: false,
            searchKeyword: undefined,
            classrooms: [],
            currentClassroom: undefined,
            studentEmails: [],
            studentAttendanceRecords: [],
            kendraIndexId: "",
            message: "",
            privateMessage: ""
        };
        this.s3Album = React.createRef();
    }

    async componentDidMount() {

        const user = await Auth.currentAuthenticatedUser();
        const teacherEmail = user.attributes.email;
        this.setState({ teacherEmail });

        this.interval = setInterval(() => {
            if (this.state.referesh)
                this.setState(({ count }) => ({ count: count + 1 }));
        }, 5000);

        let { data } = await API.graphql(graphqlOperation(queries.listClassRooms));
        console.log("AllScreenView componentDidMount", data);
        this.setState({ classrooms: data.listClassRooms.items });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSelect(e) {
        console.log(e);
        let email = e.key.split("/")[1];
        let fullSizeKey = "fullsize/" + e.key.split("/")[1] + "/" + e.key.split("/")[2];
        this.setState({ fullSizeKey, email });
        this.setState({ modalLargeViewOpen: true });
    }

    toggleRefresh() {
        this.setState(({ referesh }) => ({ referesh: !referesh }));
    }

    filter = item => {
        if (this.state.searchKeyword) {
            const regex = new RegExp(`${this.state.searchKeyword}`, "i");
            return item.filter(item => regex.test(item.key));
        }
        else {
            const currentTime = new Date();
            const studentEmails = this.state.studentEmails;
            let isRecent = lastModified => ((currentTime.getTime() - (new Date(lastModified)).getTime()) / 1000) < 3600;
            let isInClass = key => studentEmails.find(c => c === key.split("/")[1]) !== undefined;
            const online = item.filter(item => isRecent(item.lastModified) && isInClass(item.key));

            const onlineEmails = online.map(c => c.key.split("/")[1]);
            const studentAttendanceRecords = [];
            studentAttendanceRecords.push(...studentEmails.map(email => {
                return { email, isOnline: "" + onlineEmails.includes(email) };
            }));
            this.setState({ studentAttendanceRecords });
            return online;
        }
    }

    sort = item => {
        const compare = (a, b) => {
            if (a.key < b.key) {
                return -1;
            }
            if (a.key > b.key) {
                return 1;
            }
            return 0;
        };
        return item.sort(compare);
    }

    handleSearch = (event) => {
        console.log(event.target.value);
        this.setState({ searchKeyword: event.target.value });
        this.setState(({ count }) => ({ count: count + 1 }));
    }

    clearAllScreenshots = async(event) => {
        const result = this.state.studentEmails.map(c => 'resized/' + c + "/screenshot.png");
        result.map(Storage.remove);
    }

    onClassroomSelectChange = (event) => {
        if (event.target.textContent !== "") {
            const currentClassroom = this.state.classrooms.find(c => c.name === event.target.textContent);
            const { studentEmails, kendraIndexId } = currentClassroom;
            console.log(kendraIndexId, studentEmails);
            this.setState({ studentEmails, kendraIndexId, currentClassroom });
        }
    }

    generateScreenSharingTickets = async() => {
        const { studentEmails, kendraIndexId, teacherEmail } = this.state;

        let expire = new Date();
        expire.setHours(expire.getHours() + 3);

        let create3HoursTickets = async(email) => await API.graphql(graphqlOperation(mutations.createScreenSharingTicket, {
            input: {
                teacherEmail,
                email,
                kendraIndexId,
                activeUntil: expire
            }
        }));
        studentEmails.map(create3HoursTickets);
    }

    updateMessageToAllStudents = (event) => {
        console.log(event.target.value);
        this.setState({ message: event.target.value });
    }

    sendMessageToAllStudentsHandler = async(event) => {
        this.sendMessageToAllStudents(this.state.studentEmails, this.state.message);
    }

    sendMessageToAllStudents = async(studentEmails, message) => {
        const content = `<mark name="gesture:wave"/>${message}<break time="1000ms"/>`;
        console.log("sendMessageToAllStudents");
        let createMessage = async(email) => await API.graphql(graphqlOperation(mutations.createMessage, {
            input: {
                email,
                content
            }
        }));
        studentEmails.map(createMessage);
    }


    updatePrivateMessage = (event) => {
        console.log(event.target.value);
        this.setState({ privateMessage: event.target.value });
    }

    sendPrivateMessageToStudent = async(event) => {
        const email = this.state.email;
        const content = this.state.privateMessage;
        console.log("sendPrivateMessageToStudent");
        await API.graphql(graphqlOperation(mutations.createMessage, {
            input: {
                email,
                content
            }
        }));
    }

    render() {
        let classrooms = this.state.classrooms.map(c => { return { key: c.name, value: c.name, text: c.name } });
        classrooms = classrooms.sort((a, b) => (a.key > b.key) ? 1 : -1);
        return (
            <Segment>
                <div className="table">
                     <Container fluid>
                        <p>You need to first select your classroom, then click on Start Auto-refresh button.
                        Stop auto refresh if you want to save your bandwidth and computer resources!</p>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Select placeholder='Select your classroom' options={classrooms} onChange={(event)=>this.onClassroomSelectChange(event)}/>
                                <Form.Button disabled={this.state.currentClassroom === undefined}  onClick={() => this.generateScreenSharingTickets()}>Generate 3 hours screen sharing tickets</Form.Button>
                                <Form.Button disabled = {this.state.currentClassroom === undefined || this.state.referesh} onClick={() => this.toggleRefresh()}>Start auto-refresh</Form.Button>
                                <Form.Button disabled = {this.state.currentClassroom === undefined || !this.state.referesh} onClick={() => this.toggleRefresh()}>Stop auto-refresh</Form.Button>
                                <Form.Input icon='search' placeholder='Search...' onChange={(event)=>this.handleSearch(event)}/>
                                <Form.Button onClick={() => this.clearAllScreenshots()}>Delete cached screenshots</Form.Button>
                                <Form.Input disabled={this.state.currentClassroom === undefined}  placeholder='Message' onChange={(event)=>this.updateMessageToAllStudents(event)}/>
                                <Form.Button disabled={this.state.currentClassroom === undefined} onClick={() => this.sendMessageToAllStudentsHandler()}>Message all students</Form.Button>
                                <CallOuts disabled={this.state.currentClassroom === undefined} studentEmails={this.state.studentEmails} message={this.state.message} text="Call all students"/>
                                <Form.Button disabled={this.state.currentClassroom === undefined} onClick={() =>{ this.setState({ modalQuestionViewOpen: true })}}>Quiz</Form.Button>
                                {this.state.currentClassroom && this.state.referesh? (
                                    <CallOuts disabled={this.state.currentClassroom === undefined} studentAttendanceRecords={this.state.studentAttendanceRecords} text="Call absent students"/>
                                ) : ""}
                                {this.state.currentClassroom && this.state.referesh? (
                                    <OnlineReport currentClassroom={this.state.currentClassroom.name} data={this.state.studentAttendanceRecords}/>
                                ) : ""}
                            </Form.Group>
                        </Form>
                     </Container>
                    <S3Album 
                        ref={this.s3Album}
                        level="public"
                        select 
                        onSelect={(e)=>this.handleSelect(e)}
                        path={'resized/'} 
                        key={this.state.count}
                        filter={(item)=>this.filter(item)}
                        sort={(item)=>this.sort(item)}
                    />
                    <Message></Message>
                    <Modal
                        open={this.state.modalLargeViewOpen}
                        onClose={() => this.setState({ modalLargeViewOpen: false })}
                        closeIcon
                        size='fullscreen'
                    >
                        <Header icon='browser' content={this.state.email} />
                        <Modal.Content>
                            <Form>
                                <Form.Group>
                                    <Form.Input style={{width: "500px"}} placeholder='Message' onChange={(event)=>this.updatePrivateMessage(event)}/>
                                    <Form.Button onClick={() => this.sendPrivateMessageToStudent()}>Send Message</Form.Button>
                                    <CallOuts message={this.state.privateMessage} email={this.state.email} text="Call"/>
                                </Form.Group>
                            </Form>   
                            <S3Image 
                                level="public" 
                                imgKey={this.state.fullSizeKey} 
                                theme={{
                                    photoImg: { maxWidth: "100%", maxHeight: "100%" }
                                }}
                            />
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> Close it
                          </Button>
                        </Modal.Actions>
                    </Modal>
                    <Modal
                        open={this.state.modalQuestionViewOpen}
                        onClose={() => this.setState({ modalQuestionViewOpen: false })}
                        closeIcon
                        size='fullscreen'
                    >
                        <Header icon='browser' content={this.state.email} />
                        <Modal.Content>
                            <CallQuzz sendMessageToAllStudents={this.sendMessageToAllStudents} studentEmails={this.state.studentEmails} />
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> Close it
                          </Button>
                        </Modal.Actions>
                    </Modal>                    
               </div>
           </Segment>
        );
    }
}
