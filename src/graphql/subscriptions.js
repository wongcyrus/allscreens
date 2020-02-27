/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClassRoom = /* GraphQL */ `
  subscription OnCreateClassRoom($owner: String!) {
    onCreateClassRoom(owner: $owner) {
      id
      name
      description
      students {
        items {
          id
          classRoomId
          email
          owner
        }
        nextToken
      }
      status
      owner
    }
  }
`;
export const onUpdateClassRoom = /* GraphQL */ `
  subscription OnUpdateClassRoom($owner: String!) {
    onUpdateClassRoom(owner: $owner) {
      id
      name
      description
      students {
        items {
          id
          classRoomId
          email
          owner
        }
        nextToken
      }
      status
      owner
    }
  }
`;
export const onDeleteClassRoom = /* GraphQL */ `
  subscription OnDeleteClassRoom($owner: String!) {
    onDeleteClassRoom(owner: $owner) {
      id
      name
      description
      students {
        items {
          id
          classRoomId
          email
          owner
        }
        nextToken
      }
      status
      owner
    }
  }
`;
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($owner: String!) {
    onCreateStudent(owner: $owner) {
      id
      classRoomId
      classRooms {
        items {
          id
          name
          description
          status
          owner
        }
        nextToken
      }
      email
      owner
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($owner: String!) {
    onUpdateStudent(owner: $owner) {
      id
      classRoomId
      classRooms {
        items {
          id
          name
          description
          status
          owner
        }
        nextToken
      }
      email
      owner
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($owner: String!) {
    onDeleteStudent(owner: $owner) {
      id
      classRoomId
      classRooms {
        items {
          id
          name
          description
          status
          owner
        }
        nextToken
      }
      email
      owner
    }
  }
`;
