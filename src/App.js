import './App.css'
import React from 'react';  

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Header } from 'semantic-ui-react';

import ScreenSharing from './ScreenSharing';
import AllScreenView from './AllScreenView';

Amplify.configure(aws_exports);

function App() {
  return (
    <div>
      <Header as="h1">
        Share you computer screen and let work on the lab exercise toegther at home!
      </Header>
      <ScreenSharing></ScreenSharing>
      <p>Don't start auto refresh if you want to save your bandwidth and computer resources!</p>
      <AllScreenView></AllScreenView>
    </div>
  );
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});
