import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';

import User from '../../models/User.model.js';
import validateRegister from '../../helpers/validation/register.validation.js';
import createToken from '../../helpers/auth/createToken.js';

const register = async (_, args) => {
  const { valid, errors } = validateRegister(args);
  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }
  const user = await User.findOne({ email: args.email });
  if (user) {
    throw new UserInputError('Errors', { 'userExists': 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(args.password, 10);
  const newUser = new User({
    ...args,
    password: hashedPassword,
  });
  const result = await newUser.save();
  return await createToken(result);
}

const login = async (_, args) => {
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new UserInputError('Errors', { 'userNotFound': 'User not found' });
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new UserInputError('Errors', { 'invalidPassword': 'Invalid password' });
  }
  return await createToken(user);
}

export { register, login };
