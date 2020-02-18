import React from 'react';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import { withAuthenticator } from 'aws-amplify-react';
import { Header } from 'semantic-ui-react';

import adapter from 'webrtc-adapter';
import ScreenSharing from './ScreenSharing';

Amplify.configure(aws_exports);

function App() {
  return (
    <div>
      <Header as="h1">
        Screen Sharing
      </Header>
      <ScreenSharing></ScreenSharing>
    </div>
  );
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});
