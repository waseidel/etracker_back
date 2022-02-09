import { gql } from 'apollo-server-express';

const accountTypeDefs = gql`
  scalar Date
  type Account {
    id: ID
    name: String!
    description: String
    image: String
    balance: Float
    createdAt: Date
    updatedAt: Date 
  }

  extend type Query {
    getAccounts: [Account]
    getAccount(id: ID!): Account
  }

  extend type Mutation {
    createAccount(name: String!, description: String, balance: Float, image: String): Account!
    updateAccount(id: ID!, name: String, description: String, balance: Float, image: String): Account!
    deleteAccount(id: ID!): String!
  }
`;


export default accountTypeDefs;
