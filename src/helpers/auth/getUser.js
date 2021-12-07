import jwt from 'jsonwebtoken';

import User from '../../models/User.model.js';

const isLogged = (context) => {
  const bearer = context.req.headers.authorization;
  const token = bearer.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = User.findById(decoded.id);
  return user;
}

export default isLogged;
