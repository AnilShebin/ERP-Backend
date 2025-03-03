"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_2 = require("../validations/auth"); // Assuming you have defined schemas
const auth_middleware_1 = require("../middlewares/auth-middleware");
const router = (0, express_1.Router)();
// Login route
router.post('/login', (0, validate_1.default)(auth_2.loginSchema), auth_1.login);
// Register route
router.post('/register', (0, validate_1.default)(auth_2.registerSchema), auth_1.register);
// Get all registered users route
router.get('/registered-companies', auth_middleware_1.protect, (0, auth_middleware_1.authorize)('ADMIN', 'SUPER_ADMIN'), auth_1.getAllRegisteredCompanies);
exports.default = router;
