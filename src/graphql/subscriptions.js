/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateScreenSharingTicket = /* GraphQL */ `
  subscription OnCreateScreenSharingTicket($email: AWSEmail!) {
    onCreateScreenSharingTicket(email: $email) {
      email
      teacherEmail
      kendraIndexId
      activeUntil
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($email: AWSEmail!) {
    onCreateMessage(email: $email) {
      email
      content
      command
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClassRoom = /* GraphQL */ `
  subscription OnCreateClassRoom($owner: String!) {
    onCreateClassRoom(owner: $owner) {
      teacherEmail
      name
      kendraIndexId
      studentEmails
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateClassRoom = /* GraphQL */ `
  subscription OnUpdateClassRoom($owner: String!) {
    onUpdateClassRoom(owner: $owner) {
      teacherEmail
      name
      kendraIndexId
      studentEmails
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteClassRoom = /* GraphQL */ `
  subscription OnDeleteClassRoom($owner: String!) {
    onDeleteClassRoom(owner: $owner) {
      teacherEmail
      name
      kendraIndexId
      studentEmails
      createdAt
      updatedAt
      owner
    }
  }
`;
