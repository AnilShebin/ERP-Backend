"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
// utils/common.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10);
    return await bcrypt_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateToken = (staffAttributes) => {
    const payload = { id: staffAttributes.id, staff_id: staffAttributes.staff_id, role: staffAttributes.role?.code };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
};
exports.generateToken = generateToken;
