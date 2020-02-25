import './App.css';
import React, { Component } from 'react';

import Amplify,{ Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Header } from 'semantic-ui-react';

import ScreenSharing from './ScreenSharing';
import AllScreenView from './AllScreenView';

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
      <div>
        <Header as="h1">
          Share you computer screen and let work on the lab exercise toegther at home!
        </Header>
        <ScreenSharing></ScreenSharing>
        {this.state.isTeacher ? (
          <div>
            <p>Don't start auto refresh if you want to save your bandwidth and computer resources!</p>
            <AllScreenView></AllScreenView>
          </div>
        ):""}
      </div>
    );
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    defaultCountryCode: "852"
  }
});
