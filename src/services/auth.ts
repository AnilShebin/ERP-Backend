// services/auth.ts
import httpStatus from 'http-status';
import logger from '../config/logger';
import Staff from '../models/staff'; // Import Staff model
import User from '../models/user';
import Role from '../models/role';
import { LoginData, RegisterData } from '../types/auth';
import { UserAttributes } from '../types/user';
import ErrorHandler from '../utils/errorHandler';
import { comparePassword, generateToken, hashPassword } from '../utils/common';


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

export const registerService = async (data: RegisterData) => {
  const { company_name, company_email, phone, password } = data;

  // Check for existing company email
  const existingUser = await User.findOne({ where: { company_email } });
  if (existingUser) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, 'Company email already registered');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create new user
  const newUser = await User.create({
      company_name,
      company_email,
      phone,
      password: hashedPassword,
  });

  return {
      id: newUser.id,
      company_name: newUser.company_name,
      company_email: newUser.company_email,
      phone: newUser.phone,
  };
};

// New function to get all registered companies
export const getAllRegisteredCompanies = async () => {
  try {
      const companies = await User.findAll(); // Fetch all users (assuming they represent companies)
      return companies.map(company => ({
          id: company.id,
          company_name: company.company_name,
          company_email: company.company_email,
          phone: company.phone,
      }));
  } catch (error: any) {
      logger.error('Error fetching all registered companies: ' + error);
      throw new ErrorHandler(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching registered companies');
  }
};
