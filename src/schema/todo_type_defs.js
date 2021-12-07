import { gql } from 'apollo-server-express';

const todosTypeDefs = gql`
  scalar Date

  type Todo {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
    belongsTo: User!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getTodo(id: ID!): Todo!
    getTodos: [Todo]
  }

  type Message {
    message: String!
  }

  type Mutation {
    createTodo(title: String!, description: String!): Todo!
    updateTodo(id: ID!, title: String!, description: String!): Todo!
    toggleCompleted(id: ID!): Todo!
    deleteTodo(id: ID!): Message! 
  }
`;

export default todosTypeDefs;
