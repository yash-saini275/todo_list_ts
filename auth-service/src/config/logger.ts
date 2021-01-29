import * as express_winston from 'express-winston';
import * as winston from 'winston';
import {MongoDB} from 'winston-mongodb';
import env from './env';

const errorLoggerOptions = {
  db: env.DB_URL,
  collection: 'logs',
  level: 'error',
};

export const logger = express_winston.logger({
  transports: [
    new MongoDB(errorLoggerOptions),
    new winston.transports.File({filename: 'access.log'}),
  ],
  headerBlacklist: ['cookie'],
});
