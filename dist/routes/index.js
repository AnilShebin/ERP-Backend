"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const staff_1 = __importDefault(require("./staff"));
const client_1 = __importDefault(require("./client"));
const router = (0, express_1.Router)();
// Unified authentication route
router.use(auth_1.default);
router.use('/staff', staff_1.default);
router.use('/clients', client_1.default);
exports.default = router;
