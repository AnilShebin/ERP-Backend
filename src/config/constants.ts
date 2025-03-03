// config/constants.ts

import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 5000;

// PostgreSQL DB Config
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USERNAME = process.env.DB_USER || 'erp_owner';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'erp';
export const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

export const ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    SUB_ADMIN: 'SUB_ADMIN',
    USER: 'USER',
};

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';