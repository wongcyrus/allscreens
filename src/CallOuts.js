import React from "react";
import AWS from 'aws-sdk';
import { Button } from 'semantic-ui-react';
import aws_exports from './aws-exports';
import { Auth } from 'aws-amplify';

const moment = require('moment-timezone');


export default class CallOuts extends React.Component {

    callAllStudents = async() => {
        const credentials = await Auth.currentCredentials();
        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ region: aws_exports.aws_cognito_region, credentials: Auth.essentialCredentials(credentials) });

        const getStudents = async(nextToken) => {
            const params = {
                GroupName: 'students',
                UserPoolId: aws_exports.aws_user_pools_id,
                Limit: '60'
            };
            if (nextToken) params["NextToken"] = nextToken;
            let response = await cognitoidentityserviceprovider.listUsersInGroup(params).promise();
            console.log(response);
            if (response.NextToken)
                return response.Users.concat(await getStudents(response.NextToken));
            else
                return response.Users;
        };
        const allStudents = await getStudents();
        const emailAndPhoneMap = new Map(allStudents.map(s => [
            s.Attributes.find(c => c.Name === "email").Value,
            { username: s.Username, phone: s.Attributes.find(c => c.Name === "phone_number").Value }
        ]));

        const absentStudentEmailList = this.props.studentAttendanceRecords.filter(s => s.isOnline === "false").map(c => emailAndPhoneMap.get(c.email));
        console.log(absentStudentEmailList);

        const receivers = absentStudentEmailList.map((student, index) => {
            return {
                id: `CallAbsentStudents${moment().unix()}`,
                receiver_id: index,
                username: student.username,
                phone_number: student.phone
            };
        });
       
        const sqs_msg = {
            task_id: `CallStudents${moment().unix()}`,
            greeting: "Hi {{ username }},",
            ending: "Good Bye {{ username }} and have a nice day!",
            questions: [{
                question_template: "Please attend your class.",
                question_type: "OK"
            }],
            receivers: receivers
        };

        const sqs = new AWS.SQS({ region: aws_exports.aws_project_region, credentials: Auth.essentialCredentials(credentials) });
        console.log(JSON.stringify(sqs_msg));

        const fregments = aws_exports.CallsOutQueueArn.split(":");
        const queueUrl = `https://sqs.${fregments[3]}.amazonaws.com/${fregments[4]}/${fregments[5]}`;
        let response = await sqs.sendMessage({
            MessageBody: JSON.stringify(sqs_msg),
            MessageGroupId: '1',
            QueueUrl: queueUrl
        }).promise();
        console.log(response);
    }

    render() {
        return (

            <Button onClick={this.callAllStudents}>
                Call Absent Students
            </Button>

        );
    }
}
