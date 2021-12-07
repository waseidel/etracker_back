import Todo from '../../models/Todo.model.js';
import getUser from '../../helpers/auth/getUser.js'
import isLogged from '../../helpers/auth/isLogged.js'
import { AuthenticationError, UserInputError, ValidationError } from 'apollo-server-core';

const deleteTodo = async (_, { id }, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError('You must be logged in to delete a todo');
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new UserInputError('Todo not found');
  }
  const user = await getUser(context);
  if (!todo.belongsTo.equals(user._id)) {
    throw new ValidationError('You are not the owner of this todo');
  }
  await todo.delete();
  return {
    message: 'Todo deleted',
  };
}

export default deleteTodo;
