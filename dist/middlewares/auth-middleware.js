"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const staff_1 = __importDefault(require("../models/staff")); // Adjust the model import
const role_1 = __importDefault(require("../models/role")); // Assuming Role model is still needed
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new errorHandler_1.default(http_status_1.default.UNAUTHORIZED, 'Not authorized to access this route'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const staff = await staff_1.default.findByPk(decoded.id, {
            include: [{ model: role_1.default, as: 'role' }]
        });
        if (!staff) {
            return next(new errorHandler_1.default(http_status_1.default.NOT_FOUND, 'Staff not found'));
        }
        req.user = staff.get({ plain: true }); // Change to StaffAttributes
        next();
    }
    catch (error) {
        return next(new errorHandler_1.default(http_status_1.default.UNAUTHORIZED, 'Not authorized to access this route'));
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role.code)) {
            return next(new errorHandler_1.default(http_status_1.default.FORBIDDEN, 'Not authorized to access this route'));
        }
        next();
    };
};
exports.authorize = authorize;
