import { AuthenticationError } from "apollo-server-core";

import Todo from "../../models/Todo.model.js";
import getUser from "../../helpers/auth/getUser.js"
import isLogged from "../../helpers/auth/getUser.js";

const toggleCompleted = async (_, args, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError("You must be logged in to do that!");
  }
  const todo = await Todo.findById(args.id).populate("belongsTo");
  if (!todo) {
    throw new Error('Todo not found');
  }
  const user = await getUser(context);
  console.log({ user, todo });
  if (user.id !== todo.belongsTo.id) {
    throw new AuthenticationError("You can't do that!");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    args.id,
    {
      $set: {
        completed: !todo.completed
      }
    },
    { new: true }
  ).populate("belongsTo");

  return updatedTodo.save();

}

export default toggleCompleted;
