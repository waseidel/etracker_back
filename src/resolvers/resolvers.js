import getUsers from './Users/get_users.js';
import getUser from './Users/get_user.js';
import getTodos from './Todos/get_todos.js';

import login from './auth/login.js';
import register from './auth/register.js';

import createTodo from './Todos/create_todo.js';
import getTodo from './Todos/get_todo.js';
import toggleCompleted from './Todos/toggle_completed.js';
import updateTodo from './Todos/update_todo.js';
import deleteTodo from './Todos/delete_todo.js';

const resolvers = {
  Query: {
    getUsers,
    getUser,
    getTodos,
    getTodo,
  },
  Mutation: {
    register,
    login,
    createTodo,
    toggleCompleted,
    updateTodo,
    deleteTodo,
  }
};

export default resolvers;
