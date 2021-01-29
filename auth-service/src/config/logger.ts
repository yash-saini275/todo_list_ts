import * as express_winston from 'express-winston';
import * as winston from 'winston';
import {MongoDB} from 'winston-mongodb';
import env from './env';

const errorLoggerOptions = {
  db: env.DB_URL,
  collection: 'logs',
  level: 'error',
  metaKey: 'meta',
};

export const logger = express_winston.logger({
  transports: [new winston.transports.File({filename: 'access.log'})],
  headerBlacklist: ['cookie'],
  meta: true,
  format: winston.format.combine(winston.format.errors({stack: true})),
});

export const errorLogger = express_winston.errorLogger({
  transports: [new MongoDB(errorLoggerOptions)],
  headerBlacklist: ['cookie'],
  meta: true,
});
