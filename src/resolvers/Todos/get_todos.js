import { AuthenticationError } from 'apollo-server-express';

import Todo from '../../models/Todo.model.js';
import isLogged from '../../helpers/auth/isLogged.js';
import getUser from '../../helpers/auth/getUser.js';

const getTodos = async (_, __, context) => {
  if (!isLogged(context)) {
    return new AuthenticationError('You must be logged in to do that');
  }
  const user = getUser(context);
  const todos = await Todo.find({ belongsTo: user._id }).populate('belongsTo');

  return todos;
}

export default getTodos;
