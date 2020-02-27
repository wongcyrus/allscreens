/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClassRoom = /* GraphQL */ `
  mutation CreateClassRoom(
    $input: CreateClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    createClassRoom(input: $input, condition: $condition) {
      name
      studentEmails
      owner
    }
  }
`;
export const updateClassRoom = /* GraphQL */ `
  mutation UpdateClassRoom(
    $input: UpdateClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    updateClassRoom(input: $input, condition: $condition) {
      name
      studentEmails
      owner
    }
  }
`;
export const deleteClassRoom = /* GraphQL */ `
  mutation DeleteClassRoom(
    $input: DeleteClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    deleteClassRoom(input: $input, condition: $condition) {
      name
      studentEmails
      owner
    }
  }
`;
export const createScreenSharingTicket = /* GraphQL */ `
  mutation CreateScreenSharingTicket(
    $input: CreateScreenSharingTicketInput!
    $condition: ModelScreenSharingTicketConditionInput
  ) {
    createScreenSharingTicket(input: $input, condition: $condition) {
      email
      activeBefore
    }
  }
`;
export const updateScreenSharingTicket = /* GraphQL */ `
  mutation UpdateScreenSharingTicket(
    $input: UpdateScreenSharingTicketInput!
    $condition: ModelScreenSharingTicketConditionInput
  ) {
    updateScreenSharingTicket(input: $input, condition: $condition) {
      email
      activeBefore
    }
  }
`;
export const deleteScreenSharingTicket = /* GraphQL */ `
  mutation DeleteScreenSharingTicket(
    $input: DeleteScreenSharingTicketInput!
    $condition: ModelScreenSharingTicketConditionInput
  ) {
    deleteScreenSharingTicket(input: $input, condition: $condition) {
      email
      activeBefore
    }
  }
`;
