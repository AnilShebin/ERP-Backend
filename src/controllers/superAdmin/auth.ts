import { NextFunction, Request, Response } from 'express';
import * as authService from '../../services/auth';
import httpStatus from 'http-status';
import catchAsyncError from '../../middlewares/catchAsync';

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
