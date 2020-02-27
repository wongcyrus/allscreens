import './App.css';
import React, { Component } from 'react';

import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Grid, Header, Input, List, Segment } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


import ScreenSharing from './ScreenSharing';
import AllScreenView from './AllScreenView';
import ClassRoom from './ClassRoom';

Amplify.configure(aws_exports);

class App extends Component {
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
        <Grid padded>
          <Grid.Column>
            <Route path="/" exact component={ScreenSharing}/>
            {this.state.isTeacher ? (
              <div>
                <Route path="/" exact component={AllScreenView}/>
                <Route path="/" exact component={ClassRoom}/>
              </div>
            ):""}
          </Grid.Column>
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
