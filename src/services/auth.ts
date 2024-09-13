import httpStatus from 'http-status';
import logger from '../config/logger';
import User from '../models/user';
import { LoginData } from '../types/auth';
import ErrorHandler from '../utils/errorHandler';
import { comparePassword, generateToken } from '../utils/common';

export const login = async (data: LoginData) => {
    try {
        const { email, password } = data;

        const user = await User.findOne({ where: { email } });

        if (!user || !(await comparePassword(password, user.password))) {
            throw new ErrorHandler(
                httpStatus.BAD_REQUEST,
                'Wrong Credentials.'
            );
        }

        const token = generateToken(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        };
    } catch (error: any) {
        logger.error('Error in login service ' + error);
        throw error;
    }
};
