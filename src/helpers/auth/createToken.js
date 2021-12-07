import jwt from 'jsonwebtoken';

const createToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return {
    user: {
      id: user._id,
      ...user._doc,
    },
    token,
  };
}

export default createToken;
