"use strict";
// config/logger.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf((info) => {
                const { timestamp, level, message, ...args } = info;
                return `${timestamp} [${level}]: ${message} ${Object.keys(args).length
                    ? JSON.stringify(args, null, 2)
                    : ''}`;
            })),
        }),
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, `../logs/error/${(0, moment_1.default)().format('MMM-DD-YYYY')}.log`),
            // name: "file#error",
            level: 'error',
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
        }),
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, `../logs/info/${(0, moment_1.default)().format('MMM-DD-YYYY')}.log`),
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
        }),
    ],
});
exports.default = logger;
