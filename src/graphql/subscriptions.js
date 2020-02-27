/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClassRoom = /* GraphQL */ `
  subscription OnCreateClassRoom($owner: String!) {
    onCreateClassRoom(owner: $owner) {
      name
      studentEmails
      owner
    }
  }
`;
export const onUpdateClassRoom = /* GraphQL */ `
  subscription OnUpdateClassRoom($owner: String!) {
    onUpdateClassRoom(owner: $owner) {
      name
      studentEmails
      owner
    }
  }
`;
export const onDeleteClassRoom = /* GraphQL */ `
  subscription OnDeleteClassRoom($owner: String!) {
    onDeleteClassRoom(owner: $owner) {
      name
      studentEmails
      owner
    }
  }
`;
export const onCreateScreenSharingTicket = /* GraphQL */ `
  subscription OnCreateScreenSharingTicket {
    onCreateScreenSharingTicket {
      email
      activeBefore
    }
  }
`;
export const onUpdateScreenSharingTicket = /* GraphQL */ `
  subscription OnUpdateScreenSharingTicket {
    onUpdateScreenSharingTicket {
      email
      activeBefore
    }
  }
`;
export const onDeleteScreenSharingTicket = /* GraphQL */ `
  subscription OnDeleteScreenSharingTicket {
    onDeleteScreenSharingTicket {
      email
      activeBefore
    }
  }
`;
