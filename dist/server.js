"use strict";
// srver.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const http_status_1 = __importDefault(require("http-status"));
const database_1 = __importDefault(require("./config/database"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const logger_1 = __importDefault(require("./config/logger"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const index_1 = __importDefault(require("./routes/index"));
const seederService_1 = __importDefault(require("./seeders/seederService"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use('/', index_1.default);
// Health check
app.get('/', (req, res) => {
    res.status(http_status_1.default.OK).json({
        message: 'server is working fine!',
        success: true,
    });
});
// 404 error middleware
app.use((req, res, next) => {
    next(new errorHandler_1.default(http_status_1.default.NOT_FOUND, 'Route Not Found'));
});
app.use(errorMiddleware_1.default);
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    logger_1.default.info('server is running on http:/localhost:' + port);
    try {
        await database_1.default.authenticate();
        await database_1.default.sync();
        await (0, seederService_1.default)();
        logger_1.default.info('db connected');
    }
    catch (error) {
        logger_1.default.error('Error in connecting database: ', error);
    }
});
