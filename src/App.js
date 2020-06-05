import './App.css';
import React from 'react';

import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import config from './config';

import { withAuthenticator } from 'aws-amplify-react';
import { Menu, Grid, Divider, Container, Header } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import ScreenSharing from './components/ScreenSharing';
import AllScreenView from './components/AllScreenView';
import ClassRoom from './components/ClassRoom';
import VirtualTutor from './components/VirtualTutor';
import Chatbot from './components/Chatbot';



Amplify.configure(aws_exports);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

class App extends React.Component {
  constructor() {
    super();
    this.state = { isTeacher: false };
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    const group = user.signInUserSession.accessToken.payload["cognito:groups"][0];
    console.log(group);
    this.setState({ isTeacher: "teachers" === group });
  }

  render() {
    return (
      <Router>
        {this.state.isTeacher ? (
          <Grid celled padded>
            <Grid.Row>
              <Grid.Column>
                <Menu secondary>
                  <Menu.Item as={NavLink} to="/" name="AllScreenView" />
                  <Menu.Item as={NavLink} to="/ClassRoom" name="ManageClassroom" />
                </Menu>
              </Grid.Column>
             </Grid.Row>
            <Grid.Row>
              <Grid.Column>   
                <Route path="/" exact component={AllScreenView}/>
                <Route path="/ClassRoom" exact component={ClassRoom}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ):(
          <Grid celled padded style={{height: '100vh'}}>
            <Grid.Row>
              <Grid.Column>
                <Route path="/" exact component={ScreenSharing}/>
                <Chatbot/>
                <VirtualTutor/>
              </Grid.Column>
             </Grid.Row>
          </Grid>
        )}
        <Divider inverted section />
        <Container textAlign='center'>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Footer Header' />
            <p>
              Developed by <a href="https://www.vtc.edu.hk/admission/en/programme/it114115-higher-diploma-in-cloud-and-data-centre-administration/" target="_blank" rel="noopener noreferrer">
              Higher Diploma in Cloud and Data Centre Administration</a> team (Free and opensource).
              <br/> Learn more - 
              <a href="https://www.linkedin.com/pulse/how-build-online-learning-platform-engages-educates-wong/" target="_blank" rel="noopener noreferrer">
              How to build an online learning platform that engages and educates students at scale with Amazon Kendra, Amazon Comprehend, Amazon Translate,and more.</a>
            </p>
          </Grid.Column>
         </Container>
      </Router>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
  usernameAttributes: 'email',
  signUpConfig: {
    defaultCountryCode: config.defaultCountryCode,
    hideDefaults: true,
    signUpFields: [
      { label: 'Name', key: 'name', required: true, displayOrder: 0, type: 'string' }
    ],
  }
});
