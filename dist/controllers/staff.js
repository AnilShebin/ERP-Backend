"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllStaff = exports.deleteStaff = exports.updateStaff = exports.getStaff = exports.addStaff = void 0;
const http_status_1 = __importDefault(require("http-status"));
const staffService = __importStar(require("../services/staff"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const addStaff = async (req, res, next) => {
    try {
        const staff = await staffService.createStaff(req.body);
        res.status(http_status_1.default.CREATED).json({
            success: true,
            data: staff,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addStaff = addStaff;
const getStaff = async (req, res, next) => {
    try {
        const staffId = req.params.staffId; // Use 'staffId' as per the updated router
        if (!staffId) {
            return next(new errorHandler_1.default(http_status_1.default.BAD_REQUEST, 'Staff ID must be provided'));
        }
        const staff = await staffService.getStaffById(staffId);
        if (!staff) {
            return next(new errorHandler_1.default(http_status_1.default.NOT_FOUND, 'Staff member not found'));
        }
        res.status(http_status_1.default.OK).json({ success: true, data: staff });
    }
    catch (error) {
        next(error);
    }
};
exports.getStaff = getStaff;
const updateStaff = async (req, res, next) => {
    try {
        const staffId = req.params.staffId; // Use 'staffId' as per the updated router
        if (!staffId) {
            return next(new errorHandler_1.default(http_status_1.default.BAD_REQUEST, 'Staff ID must be provided'));
        }
        const [affectedRows, updatedStaff] = await staffService.updateStaff(staffId, req.body);
        if (affectedRows === 0) {
            return next(new errorHandler_1.default(http_status_1.default.NOT_FOUND, 'Staff member not found'));
        }
        res.status(http_status_1.default.OK).json({ success: true, data: updatedStaff[0] });
    }
    catch (error) {
        next(error);
    }
};
exports.updateStaff = updateStaff;
const deleteStaff = async (req, res, next) => {
    try {
        const staffId = req.params.staffId; // Use 'staffId' as per the updated router
        if (!staffId) {
            return next(new errorHandler_1.default(http_status_1.default.BAD_REQUEST, 'Staff ID must be provided'));
        }
        const affectedRows = await staffService.deleteStaff(staffId);
        if (affectedRows === 0) {
            return next(new errorHandler_1.default(http_status_1.default.NOT_FOUND, 'Staff member not found'));
        }
        res.status(http_status_1.default.NO_CONTENT).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteStaff = deleteStaff;
const listAllStaff = async (req, res, next) => {
    try {
        const staff = await staffService.getAllStaff();
        res.status(http_status_1.default.OK).json({ success: true, data: staff });
    }
    catch (error) {
        next(error);
    }
};
exports.listAllStaff = listAllStaff;
