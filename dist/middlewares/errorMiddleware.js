"use strict";
// middlewares/errorMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler")); // Assuming ErrorHandler is typed
const logger_1 = __importDefault(require("../config/logger"));
function errorMiddleware(err, req, res, next) {
    err.statusCode = err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
    err.message = err.message || 'Internal Server Error';
    // Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json web token is invalid, Try again `;
        err = new errorHandler_1.default(http_status_1.default.UNAUTHORIZED, message);
    }
    // JWT EXPIRE ERROR
    if (err.name === 'TokenExpiredError') {
        const message = `Json web token is expired, Try again `;
        err = new errorHandler_1.default(http_status_1.default.UNAUTHORIZED, message);
    }
    // Validation Error (uncomment if needed)
    // if (err.name === 'ValidationError') {
    //     const message = Object.values(err.errors).map((value) => value.message).join(', ');
    //     err = new ErrorHandler(httpStatus.BAD_REQUEST, message);
    // }
    // Send the error response
    logger_1.default.error(err.message);
    res.status(err.statusCode).json({
        status: false,
        message: err.message,
    });
}
exports.default = errorMiddleware;
