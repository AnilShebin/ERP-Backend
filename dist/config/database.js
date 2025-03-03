"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(constants_1.DB_NAME, constants_1.DB_USERNAME, constants_1.DB_PASSWORD, {
    host: constants_1.DB_HOST,
    port: 5432, // Default PostgreSQL port
    dialect: 'postgres', // ✅ Change dialect to postgres
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // For Neon SSL
        },
    },
});
exports.default = sequelize;
