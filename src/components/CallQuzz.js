import React from "react";
import { Form, TextArea } from 'semantic-ui-react';
import CallOuts from "./CallOuts";

export default class CallQuzz extends React.Component {

    constructor() {
        super();
        let questions = [];
        for (let i = 0; i < 5; i++) {
            questions.push({ template: "", type: "" });
        }
        this.state = { numberOfQuestion: 1, questions: questions, finalQuestions: undefined };
    }

    handleInputChange(event, number) {
        console.log(event.target);
        console.log(event.target.value);
        let value = event.target.value;
        this.setState((state, props) => {
            let questions = state.questions;
            questions[number].template = value;
            return { questions };
        });
        this.updateFinalQuestions();
    }

    handleSelectChange(event, number) {
        console.log(event);
        console.log(event.target);
        let value = event.target.innerText;
        console.log(number, value);
        this.setState((state, props) => {
            let questions = state.questions;
            questions[number].type = value;
            return { questions };
        });
        this.updateFinalQuestions();
    }

    handleNumberOfQuestionChange(event) {
        console.log(event.target);
        let value = event.target.innerText;
        console.log(value.split(" ")[0]);
        this.setState({ numberOfQuestion: parseInt(value.split(" ")[0], 10) });
        this.updateFinalQuestions();
    }

    updateFinalQuestions() {
        const isEmptyOrSpaces = (str) => str === null || str.match(/^ *$/) !== null;
        this.setState({ finalQuestions: undefined });

        let finalQuestions = this.state.questions.slice(0, this.state.numberOfQuestion);
        if (finalQuestions.every(q => !isEmptyOrSpaces(q.template) && !isEmptyOrSpaces(q.type))) {
            finalQuestions = finalQuestions.map(q => ({ 
                question_template: q.template.replace(/(?:\r\n|\r|\n)/g, '   '), 
                question_type: q.type }));
            console.log(finalQuestions);
            this.setState({ finalQuestions });
        }
    }

    preCallhook = async() => {
        //this.state.finalQuestions = 
        this.props.sendMessageToAllStudents(this.props.studentEmails, "I am calling you now and please prepare your phone!");
        console.log(this.state.questions);

        return this.state.finalQuestions !== undefined;
    }

    question(number) {
        const options = [
            { key: 'YES_NO', text: 'Yes/No', value: 'YES_NO' },
            { key: 'MULTIPLE_CHOICE', text: 'Multiple Choice A to E', value: 'MULTIPLE_CHOICE' },
            { key: 'Number', text: 'Number', value: 'Number' },
            { key: 'DATE', text: 'Date', value: 'DATE' },
            { key: 'TIME', text: 'Time', value: 'TIME' },
            { key: 'OK', text: 'Ok', value: 'OK' },
        ];
        return (
            <Form.Group key={""+number}>
                <Form.Field inline >
                    <label>Question {number+1}</label> 
                    <TextArea
                        data-id={""+number}
                        placeholder = "Question Template"
                        value={this.state.questions[number].template} 
                        onChange={(event)=>this.handleInputChange(event,number)}
                        style={{width:"600px"}}
                        required
                    />
                </Form.Field >
                <Form.Select
                    data-id={""+number}
                    inline
                    label='Answer type'
                    options={options}
                    placeholder='Answer type'
                    onChange={(event)=>this.handleSelectChange(event,number)}
                    size="big"
                    required
                />
            </Form.Group>
        );
    }

    render() {
        let q = Array.from(Array(this.state.numberOfQuestion).keys());
        const options = Array.from(Array(5).keys()).map(i => ({ key: i, text: (i + 1) + ' Question', value: i }));
        return (
            <Form>
                <Form.Select
                    inline
                    label='Number of Questions'
                    options={options}
                    placeholder='0'
                    value={this.state.numberOfQuestion - 1} 
                    onChange={(event)=>this.handleNumberOfQuestionChange(event)}
                    size="big"
                    required
                />
                {q.map((i)=>this.question(i))}
                <CallOuts 
                    text="Start a whole class quzz"
                    disabled={this.state.finalQuestions === undefined || this.state.finalQuestions.length === 0} 
                    studentEmails={this.props.studentEmails} 
                    questions={this.state.finalQuestions} 
                    preCallhook={this.preCallhook}
                />
            </Form>
        );
    }
}
