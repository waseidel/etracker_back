import { AuthenticationError } from 'apollo-server-express';

import User from '../../models/User.model.js';
import isLogged from '../../helpers/auth/isLogged.js';

const getUsers = async (_, __, context) => {
  if (!isLogged(context)) {
    return new AuthenticationError('You must be logged in to do that');
  }
  const users = await User.find({});
  return users;
}

export default getUsers;
