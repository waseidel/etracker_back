import { AuthenticationError } from "apollo-server-core";

import Category from "../../models/Category.model.js";

const getCategories = async (_, __, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError("You must be logged in to perform this action");
  }
  const categories = await Category.find({});
  return categories;
};

const createCategories = async (_, args, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError('You must be logged in to perform this action');
  }

  const category = new Category({ args });
  return await category.save();
};

export {
  getCategories,
  createCategories
};
