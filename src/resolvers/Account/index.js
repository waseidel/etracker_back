import { AuthenticationError } from 'apollo-server-express';

import Account from '../../models/Account.model.js';
import isLogged from '../../helpers/auth/isLogged.js';

const createAccount = async (_, args, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError('You must be logged in to create an account');
  }
  console.log(args);
  const account = new Account({ ...args });
  return await account.save();
};

const getAccounts = async (_, __, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError('You must be logged in to get accounts');
  }
  return await Account.find({});
};

const getAccount = async (_, args, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError('You must be logged in to get an account');
  }
  return await Account.findById(args.id);
};

export { createAccount, getAccounts, getAccount };
