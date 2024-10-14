// controllers/superAdmin/auth.ts
import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth';
import httpStatus from 'http-status';
import User  from '../models/user';
import catchAsyncError from '../middlewares/catchAsync';
import { hashPassword } from '../utils/common'; 

export const login = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await authService.login(req.body);
        res.status(httpStatus.OK).json({
            status: true,
            message: 'Logged in successfully.',
            data: result,
        });
    }
);

export const register = catchAsyncError(
    async (req: Request, res: Response) => {
        const result = await authService.registerService(req.body); // Call registerService from the service layer
        res.status(httpStatus.CREATED).json({
            status: true,
            message: 'Registered successfully.',
            data: result,
        });
    }
);

// Get all registered companies
export const getAllRegisteredCompanies = catchAsyncError(
    async (req: Request, res: Response) => {
        const companies = await authService.getAllRegisteredCompanies(); // Call the service function
        res.status(httpStatus.OK).json({
            status: true,
            message: 'Fetched all registered companies successfully.',
            data: companies,
        });
    }
);
