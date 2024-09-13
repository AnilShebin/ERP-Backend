import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
    password: string,
    hashPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};

export const generateToken = (users: any): string => {
    const payload = {
        id: users.id,
        email: users.email,
        roleId: users.roleId,
    };
    const expiresIn = '1h';
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string, secret: string): any => {
    return jwt.verify(token, secret);
};
