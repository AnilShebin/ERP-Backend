import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as staffService from '../services/staff';
import ErrorHandler from '../utils/errorHandler';

export const addStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await staffService.createStaff(req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    next(error);
  }
};

export const getStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staffId = req.params.staffId; // Use 'staffId' as per the updated router
    if (!staffId) {
      return next(new ErrorHandler(httpStatus.BAD_REQUEST, 'Staff ID must be provided'));
    }
    const staff = await staffService.getStaffById(staffId);
    if (!staff) {
      return next(new ErrorHandler(httpStatus.NOT_FOUND, 'Staff member not found'));
    }
    res.status(httpStatus.OK).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
};

export const updateStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staffId = req.params.staffId; // Use 'staffId' as per the updated router
    if (!staffId) {
      return next(new ErrorHandler(httpStatus.BAD_REQUEST, 'Staff ID must be provided'));
    }
    const [affectedRows, updatedStaff] = await staffService.updateStaff(staffId, req.body);
    if (affectedRows === 0) {
      return next(new ErrorHandler(httpStatus.NOT_FOUND, 'Staff member not found'));
    }
    res.status(httpStatus.OK).json({ success: true, data: updatedStaff[0] });
  } catch (error) {
    next(error);
  }
};

export const deleteStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staffId = req.params.staffId; // Use 'staffId' as per the updated router
    if (!staffId) {
      return next(new ErrorHandler(httpStatus.BAD_REQUEST, 'Staff ID must be provided'));
    }
    const affectedRows = await staffService.deleteStaff(staffId);
    if (affectedRows === 0) {
      return next(new ErrorHandler(httpStatus.NOT_FOUND, 'Staff member not found'));
    }
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export const listAllStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await staffService.getAllStaff();
    res.status(httpStatus.OK).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
};
