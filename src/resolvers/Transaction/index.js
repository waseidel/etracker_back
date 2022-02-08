import { AuthenticationError } from "apollo-server-core";

import Transaction from "../../models/Transaction.model.js";
import isLogged from "../../helpers/auth/isLogged.js";
import getUser from "../../helpers/auth/getUser.js";

const createTransaction = async (_, args, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError("You must be logged in to do that.");
  }
  console.log(args)
  const user = getUser(context);
  const transaction = new Transaction({
    ...args,
    user: user.id
  });
  return await transaction.save();
};

const getTransactions = async (_, __, context) => {
  if (!isLogged(context)) {
    throw new AuthenticatorResponse(
      'You must be logged to access this resource',
      401
    );
  }

  const user = getUser(context);
  const transactions = await Transaction.find({ user: user.id });
  return transactions;
};

export {
  createTransaction,
  getTransactions
};
