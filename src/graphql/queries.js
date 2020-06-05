/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClassRoom = /* GraphQL */ `
  query GetClassRoom($name: String!) {
    getClassRoom(name: $name) {
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
export const listClassRooms = /* GraphQL */ `
  query ListClassRooms(
    $name: String
    $filter: ModelClassRoomFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listClassRooms(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        teacherEmail
        name
        kendraIndexId
        studentEmails
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getScreenSharingTicket = /* GraphQL */ `
  query GetScreenSharingTicket($email: AWSEmail!) {
    getScreenSharingTicket(email: $email) {
      email
      teacherEmail
      kendraIndexId
      activeUntil
      createdAt
      updatedAt
    }
  }
`;
export const listScreenSharingTickets = /* GraphQL */ `
  query ListScreenSharingTickets(
    $email: AWSEmail
    $filter: ModelScreenSharingTicketFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listScreenSharingTickets(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        teacherEmail
        kendraIndexId
        activeUntil
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($email: AWSEmail!) {
    getMessage(email: $email) {
      email
      from
      content
      command
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $email: AWSEmail
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMessages(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        from
        content
        command
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
