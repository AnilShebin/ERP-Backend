"use strict";
// middlewares/catchAsync.ts
Object.defineProperty(exports, "__esModule", { value: true });
function catchAsyncError(passedFunction) {
    return (req, res, next) => {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
}
exports.default = catchAsyncError;
