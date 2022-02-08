import { gql } from 'apollo-server-express';

const accountTypeDefs = gql`
  type Account {
    id: ID!
    name: String!
    description: String
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getAccounts: [Account]
    getAccount(id: ID!): Account
  }

  extend type Mutation {
    createAccount(name: String!, description: String): Account
    updateAccount(id: ID!, name: String, description: String): Account
    deleteAccount(id: ID!): Account
  }
`;


export default accountTypeDefs;
