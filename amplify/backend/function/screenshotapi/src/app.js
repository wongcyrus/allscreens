/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authAllscreens59d1a2d8UserPoolId = process.env.AUTH_ALLSCREENS59D1A2D8_USERPOOLID
var storageScreenshotsBucketName = process.env.STORAGE_SCREENSHOTS_BUCKETNAME

Amplify Params - DO NOT EDIT */

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const imageDataURI = require('image-data-uri');

const aws = require('aws-sdk');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

// declare a new express app
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**********************
 * Example get method *
 **********************/

app.get('/screenshots', (req, res) => {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/screenshots/*', (req, res) => {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

const uploadFile = async(filePath, bucketName, key) => {
  const s3 = new aws.S3();
  let data = await readFileAsync(filePath);
  let base64data = new Buffer(data, 'binary');
  let params = {
    Bucket: bucketName,
    Key: key,
    Body: base64data
  };
  return s3.upload(params).promise();
};

app.post('/screenshots', async(req, res) => {
  try {
 
    const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
    const authProvider = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider;
    const [, , , userSub] = authProvider.match(IDP_REGEX);

    const userPoolId = process.env.AUTH_ALLSCREENS59D1A2D8_USERPOOLID;
    console.log(userSub);

    const cognito = new aws.CognitoIdentityServiceProvider();
    const listUsersResponse = await cognito.listUsers({
      UserPoolId: userPoolId,
      Filter: `sub = "${userSub}"`,
      Limit: 1
    }).promise();
    const email = listUsersResponse.Users[0].Attributes.find(c => c.Name === "email").Value;

    let dataURI = req.body.dataUrl;
    const filePath = '/tmp/screenshot.png';
    await imageDataURI.outputFile(dataURI, filePath);

    let result = await uploadFile(filePath, process.env.STORAGE_SCREENSHOTS_BUCKETNAME, email + "/screenshot.png");
    console.log(result);

    res.json({ success: 'put call succeed!', result });
  }
  catch (error) {
    console.error(error);
    res.json({ success: 'put call failed!', url: req.url, body: error });
  }
});

app.post('/screenshots/*', (req, res) => {
  console.log('/screenshots/*');
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put('/screenshots', (req, res) => {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/screenshots/*', (req, res) => {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/screenshots', (req, res) => {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/screenshots/*', (req, res) => {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
