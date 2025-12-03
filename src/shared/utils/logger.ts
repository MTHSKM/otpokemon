import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [new transports.Console()],
  exceptionHandlers: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.json(),
      ),
    }),
  ],
});
