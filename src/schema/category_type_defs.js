import { gql } from 'apollo-server-express';

const categoryTypeDefs = gql`
  scalar Date
  
  type Category {
    id: ID
    name: String!
    description: String
    createdAt: Date
    updatedAt: Date
  }

  input CategoryInput {
    name: String!
    image: String
    description: String!
  }

  extend type Query {
    getCategories: [Category!]!
    category(id: ID!): Category
  }

  extend type Mutation {
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category!
    deleteCategory(id: ID!): Category!
  }
`;


export default categoryTypeDefs;
