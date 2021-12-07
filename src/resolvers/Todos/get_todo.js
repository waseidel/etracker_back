import { AuthenticationError } from 'apollo-server-express';

import Todo from '../../models/Todo.model.js';
import isLogged from '../../helpers/auth/isLogged.js';

const getTodo = async (_, arg, context) => {
  if (!isLogged(context)) {
    return new AuthenticationError('You must be logged in to do that');
  }
  const todo = await Todo.findById(arg.id).populate('belongsTo');

  return todo;
}

export default getTodo;
