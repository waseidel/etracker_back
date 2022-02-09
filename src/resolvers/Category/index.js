import { AuthenticationError } from "apollo-server-core";

import Category from "../../models/Category.model.js";

import isLogged from "../../helpers/auth/isLogged.js";

const getCategories = async (_, __, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError("You must be logged in to perform this action");
  }
  const categories = await Category.find({});
  return categories;
};

const createCategory = async (_, { input }, context) => {
  if (!isLogged(context)) {
    throw new AuthenticationError('You must be logged in to perform this action');
  }

  const category = new Category({ ...input });
  console.log({ ...input });
  const savedCategory = await category.save();
  return savedCategory;
};

export {
  getCategories,
  createCategory
};
