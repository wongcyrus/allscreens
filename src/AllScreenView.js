import React from "react"
import { S3Album } from 'aws-amplify-react';

export default class AllScreenView extends React.Component {
    render() {
        return (
            <S3Album 
               level="public" 
               path={'resized/'} 
           />
        );
    }
}
