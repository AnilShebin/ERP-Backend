import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from './constants';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
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

export default sequelize;