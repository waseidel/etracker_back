import { AuthenticationError, UserInputError } from "apollo-server-core";

import Todo from "../../models/Todo.model.js";
import getUser from "../../helpers/auth/getUser.js"
import isLogged from "../../helpers/auth/isLogged.js"

const updateTodo = async (_, args, context) => {
  const { id, description, completed } = args;
  if (!isLogged(context)) {
    throw new AuthenticationError('You must be logged in to update a todo');
  }
  const todo = await Todo.findById(id).populate("belongsTo");

  if (!todo) {
    throw new UserInputError("Todo not found");
  }
  const user = await getUser(context);
  console.log(user.id === todo.belongsTo.id);
  if (user.id !== todo.belongsTo.id) {
    throw new AuthenticationError("Not authorized");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { $set: { description, completed } },
    { new: true }
  ).populate("belongsTo");

  return updatedTodo;
};

export default updateTodo;
