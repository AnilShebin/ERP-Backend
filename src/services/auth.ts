import httpStatus from 'http-status';
import logger from '../config/logger';
import User from '../models/user';
import Role from '../models/role';
import { LoginData, RegisterData } from '../types/auth';
import { UserAttributes } from '../types/user';
import ErrorHandler from '../utils/errorHandler';
import { comparePassword, generateToken, hashPassword } from '../utils/common';

export const login = async (data: LoginData) => {
  try {
    const { staff_id, password } = data;

    const user = await User.findOne({ 
      where: { staff_id },
      include: [{ model: Role, as: 'role' }]
    });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Invalid credentials');
    }

    const userAttributes: UserAttributes = user.get({ plain: true });
    const token = generateToken(userAttributes);

    return {
      id: userAttributes.id,
      name: userAttributes.name,
      staff_id: userAttributes.staff_id,
      role: userAttributes.role?.code,
      token,
    };
  } catch (error: any) {
    logger.error('Error in login service: ' + error);
    throw error;
  }
};

export const register = async (data: RegisterData) => {
  try {
    const { name, staff_id, password, roleId, phone } = data;

    const existingUser = await User.findOne({ where: { staff_id } });
    if (existingUser) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Staff_ID already registered');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      staff_id,
      password: hashedPassword,
      roleId,
      phone: phone || null,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      staff_id: newUser.staff_id,
    };
  } catch (error: any) {
    logger.error('Error in register service: ' + error);
    throw error;
  }
};