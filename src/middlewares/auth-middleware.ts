import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import Staff from '../models/staff'; // Adjust the model import
import Role from '../models/role'; // Assuming Role model is still needed
import ErrorHandler from '../utils/errorHandler';
import { StaffAttributes } from '../types/staff'; // Change import to the Staff attributes

interface DecodedToken {
  id: number;
  staff_id: number;
  roleId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: StaffAttributes; // Change to StaffAttributes
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

    const staff = await Staff.findByPk(decoded.id, {
      include: [{ model: Role, as: 'role' }]
    });

    if (!staff) {
      return next(new ErrorHandler(httpStatus.NOT_FOUND, 'Staff not found'));
    }

    req.user = staff.get({ plain: true }) as StaffAttributes; // Change to StaffAttributes
    next();
  } catch (error) {
    return next(new ErrorHandler(httpStatus.UNAUTHORIZED, 'Not authorized to access this route'));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role || !roles.includes(req.user.role.code)) {
      return next(new ErrorHandler(httpStatus.FORBIDDEN, 'Not authorized to access this route'));
    }
    next();
  };
};
