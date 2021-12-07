import Todo from '../../models/Todo.model.js';
import isLogged from '../../helpers/auth/isLogged.js';
import getUser from '../../helpers/auth/getUser.js';

const createTodo = async (_, args, context) => {

  if (!isLogged(context)) {
    throw new Error('You must be logged in to create a todo');
  }
  const user = await getUser(context);
  const todo = await new Todo({
    title: args.title,
    description: args.description,
    belongsTo: user._id,
  }).populate('belongsTo');
  return todo.save();
}

export default createTodo;
