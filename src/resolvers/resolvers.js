import { register, login } from "./auth/index.js"
import { getUser, getUsers } from "./User/index.js"
import { getTransactions, createTransaction } from "./Transaction/index.js"
import { getAccounts, createAccount } from "./Account/index.js"
import { getCategories, createCategory } from "./Category/index.js"

const resolvers = {
  TransactionType: {
    DEBIT: "debit",
    CREDIT: "credit"
  },
  Query: {
    getUsers,
    getUser,
    getTransactions,
    getAccounts,
    getCategories
  },
  Mutation: {
    register,
    login,
    createTransaction,
    createAccount,
    createCategory
  }
};

export default resolvers;
