import React from "react";
import { Storage } from 'aws-amplify';
import { S3Album, S3Image } from 'aws-amplify-react';
import { Button, Header, Icon, Modal, Input, Container, Segment, Select, Form} from 'semantic-ui-react';

import API, { graphqlOperation } from '@aws-amplify/api';

import * as queries from './graphql/queries';


export default class AllScreenView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            count: 0,
            referesh: false,
            searchKeyword: undefined,
            classrooms: [],
            studentEmails: []
        };
        this.s3Album = React.createRef();
    }

    async componentDidMount() {
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
        this.setState({ modalOpen: true });
    }

    toggleRefresh() {
        this.setState(({ referesh }) => ({ referesh: !referesh }));
    }

    handleClose = () => this.setState({ modalOpen: false })

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
            return item.filter(item => isRecent(item.lastModified) && isInClass(item.key));
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
            const studentEmails = this.state.classrooms.find(c => c.name === event.target.textContent).studentEmails;
            console.log(studentEmails);
            this.setState({ studentEmails });
        }
    }

    render() {
        let imageStyle = {
            maxWidth: "80%",
            maxHeight: "80%"
        };
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
                                <Form.Button disabled = {this.state.referesh} onClick={() => this.toggleRefresh()}>Start Auto-refresh.</Form.Button>
                                <Form.Button disabled = {!this.state.referesh} onClick={() => this.toggleRefresh()}>Stop Auto-refresh.</Form.Button>
                                <Form.Input icon='search' placeholder='Search...' onChange={(event)=>this.handleSearch(event)}/>
                                <Form.Button onClick={() => this.clearAllScreenshots()}>Delete cached screenshots.</Form.Button>
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
                    <Modal
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        closeIcon
                        size='fullscreen'
                    >
                        <Header icon='browser' content={this.state.email} />
                        <Modal.Content>
                            <S3Image 
                                level="public" 
                                imgKey={this.state.fullSizeKey} 
                                style={imageStyle}
                            />
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
