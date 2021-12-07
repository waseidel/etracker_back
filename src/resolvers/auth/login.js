import { ValidationError } from "apollo-server-express";
import bcrypt from 'bcrypt';

import validateLogin from '../../helpers/validation/login.validation.js';
import createToken from '../../helpers/auth/createToken.js';

import User from '../../models/User.model.js';

const login = async (_, args) => {
  const { valid, errors } = validateLogin(args);
  if (valid) {
    throw new ValidationError({ errors });
  }
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new ValidationError('User does not exist');
  }
  const isMatch = await bcrypt.compare(args.password, user.password);
  if (!isMatch) {
    throw new ValidationError('Incorrect password');
  }
  return await createToken(user);
}

export default login;
