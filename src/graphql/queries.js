/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClassRoom = /* GraphQL */ `
  query GetClassRoom($id: ID!) {
    getClassRoom(id: $id) {
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
export const listClassRooms = /* GraphQL */ `
  query ListClassRooms(
    $filter: ModelClassRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        students {
          nextToken
        }
        status
        owner
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        classRoomId
        classRooms {
          nextToken
        }
        email
        owner
      }
      nextToken
    }
  }
`;
export const listStudentByClassRoom = /* GraphQL */ `
  query ListStudentByClassRoom(
    $classRoomId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentByClassRoom(
      classRoomId: $classRoomId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classRoomId
        classRooms {
          nextToken
        }
        email
        owner
      }
      nextToken
    }
  }
`;
export const listStudentByEmail = /* GraphQL */ `
  query ListStudentByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classRoomId
        classRooms {
          nextToken
        }
        email
        owner
      }
      nextToken
    }
  }
`;
