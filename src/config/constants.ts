// config/constants.ts

import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 5000;
export const DB_HOST = process.env.DB_HOST || 'salon_bot';
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'salon_bot';

export const ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    SUB_ADMIN: 'SUB_ADMIN',
    USER: 'USER',
};

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
