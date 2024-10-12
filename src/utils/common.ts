import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserAttributes } from '../types/user';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (inputPassword: string, hashedPassword: string) => {
  return await bcrypt.hash(inputPassword, hashedPassword);
};

export const generateToken = (user: UserAttributes) => {
  return jwt.sign(
    { 
      id: user.id, 
      staff_id: user.staff_id, 
      roleId: user.roleId 
    }, 
    process.env.JWT_SECRET!, 
    { 
      expiresIn: '1d' 
    }
  );
};