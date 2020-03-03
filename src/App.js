import './App.css';
import React from 'react';

import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Menu, Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';



import ScreenSharing from './ScreenSharing';
import AllScreenView from './AllScreenView';
import ClassRoom from './ClassRoom';
import VirtualTutor from './VirtualTutor';
import Recorder from './Recorder';


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
        <Route path="/" exact component={ScreenSharing}/>
        <Route path="/AllScreenView" exact component={AllScreenView}/>
        <Route path="/ClassRoom" exact component={ClassRoom}/>
        <Recorder/>
        <Grid celled padded style={{height: '100vh'}}>
          <Grid.Row style={{height: '100%'}}>
            <Grid.Column>
              {this.state.isTeacher ? (
                <Menu secondary>
                  <Menu.Item as={NavLink} to="/" name="ShareScreen" />
                  <Menu.Item as={NavLink} to="/AllScreenView" name="AllScreenView" />
                  <Menu.Item as={NavLink} to="/ClassRoom" name="ManageClassRoom" />
                </Menu>
              ):<VirtualTutor/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    defaultCountryCode: "852"
  }
});
