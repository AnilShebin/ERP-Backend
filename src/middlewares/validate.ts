import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import httpStatus from 'http-status';
import ErrorHandler from '../utils/errorHandler';

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return next(new ErrorHandler(httpStatus.BAD_REQUEST, errorMessages.join(', ')));
    }

    next();
  };
};

export default validate;
