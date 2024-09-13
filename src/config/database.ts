import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from './constants';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
