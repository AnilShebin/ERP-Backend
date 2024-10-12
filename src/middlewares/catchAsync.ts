// middlewares/catchAsync.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';

function catchAsyncError(
    passedFunction: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>
): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
}

export default catchAsyncError;
