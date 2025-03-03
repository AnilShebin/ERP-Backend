"use strict";
// config/constants.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.ROLE = exports.DB_PORT = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_HOST = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 5000;
// PostgreSQL DB Config
exports.DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_USERNAME = process.env.DB_USER || 'erp_owner';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
exports.DB_NAME = process.env.DB_NAME || 'erp';
exports.DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
exports.ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    SUB_ADMIN: 'SUB_ADMIN',
    USER: 'USER',
};
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
