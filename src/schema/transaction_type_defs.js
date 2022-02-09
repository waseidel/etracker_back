import { gql } from 'apollo-server-express';

const transactionTypeDefs = gql`
  scalar Date
  type Transaction {
    id: ID!
    description: String
    value: Float
    user: User
    type: TransactionType
    account: Account
    category: Category
    createdAt: Date
    updatedAt: Date
  }
  
  enum TransactionType {
    DEBIT
    CREDIT
  }

  type Query {
    getTransactions: [Transaction]
    getTransaction(id: ID!): Transaction
  }

   type Mutation {
    createTransaction(
      name: String!
      description: String
      value: Float!
      category: String!
      type: TransactionType!
      account: String!
    ): Transaction
    updateTransaction(id: ID!, name: String, description: String): Transaction
    deleteTransaction(id: ID!): Transaction
  }
`;


export default transactionTypeDefs;
