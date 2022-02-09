import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  scalar Date

  type User {
    id: ID
    name: String
    email: String
    createdAt: Date
    updatedAt: Date
  }

  type TokenizedUser {
    token: String!
    user: User!
  }

  type Query {
    getUser(id: ID!): User!
    getUsers: [User]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, confirmPassword: String!): TokenizedUser!
    login(email: String!, password: String!): TokenizedUser!
  }
`;

export default userTypeDefs;
