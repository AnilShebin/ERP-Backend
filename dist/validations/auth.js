"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
// src/validations/auth.ts
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    company_name: joi_1.default.string().max(100).required(),
    company_email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().optional(),
    password: joi_1.default.string().min(6).required(),
});
// Define the login schema as well if needed
exports.loginSchema = joi_1.default.object({
    staff_id: joi_1.default.string().required(),
    password: joi_1.default.string().min(6).required(),
});
