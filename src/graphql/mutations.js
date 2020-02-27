/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClassRoom = /* GraphQL */ `
  mutation CreateClassRoom(
    $input: CreateClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    createClassRoom(input: $input, condition: $condition) {
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
export const updateClassRoom = /* GraphQL */ `
  mutation UpdateClassRoom(
    $input: UpdateClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    updateClassRoom(input: $input, condition: $condition) {
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
export const deleteClassRoom = /* GraphQL */ `
  mutation DeleteClassRoom(
    $input: DeleteClassRoomInput!
    $condition: ModelClassRoomConditionInput
  ) {
    deleteClassRoom(input: $input, condition: $condition) {
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
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
