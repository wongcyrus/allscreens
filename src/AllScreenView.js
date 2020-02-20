import React from "react"
import {S3Image, S3Album } from 'aws-amplify-react';

export default class AllScreenView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <S3Album 
               level="public" 
               path={'resized/'} 
           />
        );
    }
}
