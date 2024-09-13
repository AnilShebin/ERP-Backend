import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ErrorHandler from '../utils/errorHandler'; // Assuming ErrorHandler is typed
import logger from '../config/logger';

interface CustomError extends Error {
    statusCode: number;
}

function errorMiddleware(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    err.statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    err.message = err.message || 'Internal Server Error';

    // Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json web token is invalid, Try again `;
        err = new ErrorHandler(httpStatus.UNAUTHORIZED, message);
    }

    // JWT EXPIRE ERROR
    if (err.name === 'TokenExpiredError') {
        const message = `Json web token is expired, Try again `;
        err = new ErrorHandler(httpStatus.UNAUTHORIZED, message);
    }

    // Validation Error (uncomment if needed)
    // if (err.name === 'ValidationError') {
    //     const message = Object.values(err.errors).map((value) => value.message).join(', ');
    //     err = new ErrorHandler(httpStatus.BAD_REQUEST, message);
    // }

    // Send the error response
    logger.error(err.message);
    res.status(err.statusCode).json({
        status: false,
        message: err.message,
    });
}

export default errorMiddleware;
