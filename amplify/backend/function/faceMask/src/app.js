/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	AUTH_ALLSCREENS6E0C57A0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/images", function(req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/images/*", function(req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/
function getBinary(base64Image) {
  const atob = require("atob");
  let binaryImg = atob(base64Image);
  let length = binaryImg.length;
  let ab = new ArrayBuffer(length);
  let ua = new Uint8Array(ab);
  for (let i = 0; i < length; i++) {
    ua[i] = binaryImg.charCodeAt(i);
  }
  return ab;
}

app.post("/images", async(req, res) => {
  //console.log(req.body.dataUrl);
  const data = req.body.dataUrl;
  if (data === null) res.json({ success: "post call succeed!", noMask: false });

  let base64Image = data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  let imageBytes = getBinary(base64Image);

  const AWS = require("aws-sdk");
  const client = new AWS.Rekognition();

  let maskResult = await client.detectProtectiveEquipment({
    Image: {
      Bytes: imageBytes,
    },
    SummarizationAttributes: {
      MinConfidence: '80',
      /* required */
      RequiredEquipmentTypes: [ /* required */
        "FACE_COVER"
        /* more items */
      ]
    }
  }).promise();

  console.log(JSON.stringify(maskResult));

  let noMask = false;
  let wearMaskImproperly = false;
  if (maskResult.Persons.length > 0) {
    const facesResults = maskResult.Persons.filter(c => c.BodyParts.filter(s => s.Name === "FACE").length > 0)
      .map(c => c.BodyParts.filter(s => s.Name === "FACE")[0]);
    noMask = facesResults.filter(c => c.Confidence > 80 && c.EquipmentDetections.length === 0).length > 0;
    wearMaskImproperly = facesResults.filter(c => c.Confidence > 80 && c.EquipmentDetections.length === 1 && !c.EquipmentDetections[0].CoversBodyPart.Value).length > 0;
    console.log(JSON.stringify(facesResults));
  }
  const result = { noMask, wearMaskImproperly };
  console.log(result);
  res.json({ success: "check mask succeed!", result });
});

app.post("/images/*", function(req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/images", function(req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/images/*", function(req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/images", function(req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/images/*", function(req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
