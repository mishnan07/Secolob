import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { SECRET_KEY } from '../config.js';

dotenv.config()

// Handle generate token
export const generateAuthToken = (user) => {
  const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
  };
  
  const token = jwt.sign({ payload }, SECRET_KEY);
  return token;
};

//Handle verify token
export const authMiddleware = (req, res, next) => {
  let token = req.header('Authorization');      
  try {
    if (!token) return res.status(404).json({ message: 'Authorization Failed: no token provided' });
    if (token.startsWith('Bearer ')) {
      token = token.slice(7,token.length).trimLeft(); 
      const verified = jwt.verify(token,SECRET_KEY);
      req.user = verified;
    }
    next();
  } catch (error) {
    return res.status(404).json({ message: 'Authorization Failed: invalid token' });
  }
};
