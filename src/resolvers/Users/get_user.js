import { AuthenticationError } from 'apollo-server-express';

import User from '../../models/User.model.js';
import isLogged from '../../helpers/auth/isLogged.js';

const getUser = async (_, args, context) => {
  if (!isLogged(context)) {
    return new AuthenticationError('You must be logged in to do that');
  }
  const user = await User.findById(args.id);
  return user;
}

export default getUser;
