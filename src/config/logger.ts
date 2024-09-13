import moment from 'moment';
import path from 'path';
import { createLogger, transports, format, Logger } from 'winston';

// const logger: Logger = createLogger({
//     level: 'info',
//     format: format.combine(
//         format.colorize({ all: true }),
//         format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
//         format.align(),
//         format.printf((info) => {
//             const { timestamp, level, message, ...args } = info;

//             return `${timestamp} [${level}]: ${message} ${
//                 Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
//             }`;
//         })
//     ),
//     transports: new transports.Console(),
// });

const logger: Logger = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                format.align(),
                format.printf((info) => {
                    const { timestamp, level, message, ...args } = info;

                    return `${timestamp} [${level}]: ${message} ${
                        Object.keys(args).length
                            ? JSON.stringify(args, null, 2)
                            : ''
                    }`;
                })
            ),
        }),
        new transports.File({
            filename: path.join(
                __dirname,
                `../logs/error/${moment().format('MMM-DD-YYYY')}.log`
            ),
            // name: "file#error",
            level: 'error',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(
                    (info) =>
                        `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
        new transports.File({
            filename: path.join(
                __dirname,
                `../logs/info/${moment().format('MMM-DD-YYYY')}.log`
            ),
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(
                    (info) =>
                        `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
    ],
});
export default logger;
