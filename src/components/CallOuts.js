import React from "react";
import AWS from 'aws-sdk';
import { Form } from 'semantic-ui-react';
import aws_exports from '../aws-exports';
import config from '../config';
import { Auth } from 'aws-amplify';

const moment = require('moment-timezone');

export default class CallOuts extends React.Component {

    call = async() => {
        let sqs_msg;
        const credentials = await Auth.currentCredentials();
        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ region: aws_exports.aws_cognito_region, credentials: Auth.essentialCredentials(credentials) });

        const getEmailAndUserMap = users => new Map(users.map(s => [
            s.Attributes.find(c => c.Name === "email").Value,
            { username: s.Username, phone: s.Attributes.find(c => c.Name === "phone_number").Value }
        ]));

        console.log(this.props);
        if (this.props.studentAttendanceRecords) {
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
            const emailAndPhoneMap = getEmailAndUserMap(allStudents);
            const absentStudentEmailList = this.props.studentAttendanceRecords.filter(s => s.isOnline === "false").map(c => emailAndPhoneMap.get(c.email));
            console.log(absentStudentEmailList);

            const receivers = absentStudentEmailList.map((student, index) => {
                return {
                    id: `CallAbsentStudents_${moment().unix()}_${index}`,
                    receiver_id: "Student" + index,
                    username: student.username,
                    phone_number: student.phone
                };
            });

            sqs_msg = {
                task_id: `CallStudents${moment().unix()}`,
                greeting: "Hi {{ username }},",
                ending: "Good Bye {{ username }} and have a nice day!",
                questions: [{
                    question_template: "Please attend your lab class and share your screen to your teacher.",
                    question_type: "OK"
                }],
                receivers: receivers
            };
        }
        else if (this.props.message && this.props.email) {
            const params = {
                UserPoolId: aws_exports.aws_user_pools_id,
                Filter: `email="${this.props.email}"`,
                Limit: '1'
            };
            let response = await cognitoidentityserviceprovider.listUsers(params).promise();
            console.log(response.Users);
            const emailAndPhoneMap = getEmailAndUserMap(response.Users);
            console.log(emailAndPhoneMap);

            sqs_msg = {
                task_id: `CallStudents${moment().unix()}`,
                greeting: "Hi {{ username }},",
                ending: "Good Bye {{ username }} and have a nice day!",
                questions: [{
                    question_template: this.props.message,
                    question_type: "OK"
                }],
                receivers: [{
                    id: `CallPrivate_${moment().unix()}`,
                    receiver_id: "Student",
                    username: emailAndPhoneMap.get(this.props.email).username,
                    phone_number: emailAndPhoneMap.get(this.props.email).phone
                }]
            };
        }

        if (sqs_msg) {
            const sqs = new AWS.SQS({ region: aws_exports.aws_project_region, credentials: Auth.essentialCredentials(credentials) });
            console.log(JSON.stringify(sqs_msg));

            const fregments = config.CallSqsQueueArn.split(":");
            const queueUrl = `https://sqs.${fregments[3]}.amazonaws.com/${fregments[4]}/${fregments[5]}`;
            let response = await sqs.sendMessage({
                MessageBody: JSON.stringify(sqs_msg),
                MessageGroupId: '1',
                QueueUrl: queueUrl
            }).promise();
            console.log(response);
        }
    }

    render() {
        return (
            <Form.Button onClick={this.call}>
                {this.props.text}
            </Form.Button>
        );
    }
}
