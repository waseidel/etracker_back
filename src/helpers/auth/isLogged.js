import jwt from 'jsonwebtoken';

const isLogged = (context) => {
  const bearer = context.req.headers.authorization;
  if (typeof bearer !== 'undefined') {
    const token = bearer.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export default isLogged;
