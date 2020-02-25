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
          Share you computer screen and let work on lab exercise together online!
        </Header>
        <ScreenSharing></ScreenSharing>
        {this.state.isTeacher ? (
          <div>
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
