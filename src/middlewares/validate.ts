// middlewares/validate.ts

import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import httpStatus from 'http-status';
import ErrorHandler from '../utils/errorHandler';
import logger from '../config/logger';

const validate =
    (schema: Schema) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const { value, error } = schema.validate(req.body);

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');

            logger.error(errorMessage);
            return next(
                new ErrorHandler(httpStatus.UNPROCESSABLE_ENTITY, errorMessage)
            );
        }

        return next();
    };

export default validate;
