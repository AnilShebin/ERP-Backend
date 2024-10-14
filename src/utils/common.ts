// utils/common.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (staffAttributes: any) => {
    const payload = { id: staffAttributes.id, staff_id: staffAttributes.staff_id, role: staffAttributes.role?.code };
    return jwt.sign(payload, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
};
