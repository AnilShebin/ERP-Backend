"use strict";
// utils/Handler.ts
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // Maintaining proper stack trace in V8 engines (e.g., Node.js)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
