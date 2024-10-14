// services/auth.ts
import httpStatus from 'http-status';
import logger from '../config/logger';
import Staff from '../models/staff'; // Import Staff model
import Role from '../models/role';
import { LoginData } from '../types/auth';
import ErrorHandler from '../utils/errorHandler';
import { comparePassword, generateToken } from '../utils/common';

export const login = async (data: LoginData) => {
    try {
        const { staff_id, password } = data;

        const staff = await Staff.findOne({ 
            where: { staff_id },
            include: [{ model: Role, as: 'role' }]
        });

        // Check if staff exists and validate password
        if (!staff || !(await comparePassword(password, staff.password))) {
            throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Invalid credentials');
        }

        const staffAttributes = staff.get({ plain: true });
        const token = generateToken(staffAttributes);

        return {
            id: staffAttributes.id,  // Required
            staff_id: staffAttributes.staff_id,
            role: staffAttributes.role?.code,
            token,
        };
    } catch (error: any) {
        logger.error('Error in login service: ' + error);
        throw error;
    }
};
