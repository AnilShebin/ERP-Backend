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
exports.getAllRegisteredCompanies = exports.register = exports.login = void 0;
const authService = __importStar(require("../services/auth"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../middlewares/catchAsync"));
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await authService.login(req.body);
    res.status(http_status_1.default.OK).json({
        status: true,
        message: 'Logged in successfully.',
        data: result,
    });
});
exports.register = (0, catchAsync_1.default)(async (req, res) => {
    const result = await authService.registerService(req.body); // Call registerService from the service layer
    res.status(http_status_1.default.CREATED).json({
        status: true,
        message: 'Registered successfully.',
        data: result,
    });
});
// Get all registered companies
exports.getAllRegisteredCompanies = (0, catchAsync_1.default)(async (req, res) => {
    const companies = await authService.getAllRegisteredCompanies(); // Call the service function
    res.status(http_status_1.default.OK).json({
        status: true,
        message: 'Fetched all registered companies successfully.',
        data: companies,
    });
});
