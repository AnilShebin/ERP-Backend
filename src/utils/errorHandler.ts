// utils/Handler.ts

class ErrorHandler extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;

        // Maintaining proper stack trace in V8 engines (e.g., Node.js)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
