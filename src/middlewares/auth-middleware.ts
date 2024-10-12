import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../models/user';
import Role from '../models/role';
import ErrorHandler from '../utils/errorHandler';
import { UserAttributes } from '../types/user';

interface DecodedToken {
  id: number;
  staff_id: number;
  roleId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler(httpStatus.UNAUTHORIZED, 'Not authorized to access this route'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await User.findByPk(decoded.id, {
      include: [{ model: Role, as: 'role' }]
    });

    if (!user) {
      return next(new ErrorHandler(httpStatus.NOT_FOUND, 'User not found'));
    }

    req.user = user.get({ plain: true }) as UserAttributes;
    next();
  } catch (error) {
    return next(new ErrorHandler(httpStatus.UNAUTHORIZED, 'Not authorized to access this route'));
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user exists and has a valid role
    if (!req.user || !req.user.role || !roles.includes(req.user.role.code)) {
      return next(new ErrorHandler(httpStatus.FORBIDDEN, 'Not authorized to access this route'));
    }
    next();
  };
};
