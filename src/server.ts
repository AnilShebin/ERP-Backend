import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import httpStatus from 'http-status';
import sequelize from './config/database';
import errorMiddleware from './middlewares/errorMiddleware';
import logger from './config/logger';
import ErrorHandler from './utils/errorHandler';
import routes from './routes/index';

import initSeed from './seeders/seederService';

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use('/', routes);

// Health check
app.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        message: 'server is working fine!',
        success: true,
    });
});

// 404 error middleware
app.use((req, res, next) => {
    next(new ErrorHandler(httpStatus.NOT_FOUND, 'Route Not Found'));
});

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    logger.info('server is running on http://localhost:' + port);
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await initSeed();
        logger.info('db connected');
    } catch (error) {
        logger.error('Error in connecting database: ', error);
    }
});
