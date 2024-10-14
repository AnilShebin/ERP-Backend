// utils/common.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserAttributes } from '../types/user';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (staffAttributes: any) => {
    const payload = { id: staffAttributes.id, staff_id: staffAttributes.staff_id, role: staffAttributes.role?.code };
    return jwt.sign(payload, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
};
