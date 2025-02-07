import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

const logLevel = {
  Fatal: 'fatal',
  Error: 'error',
  Warn: 'warn',
  Info: 'info',
  Debug: 'debug',
  Trace: 'trace',
  Silent: 'silent',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logger: any = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  base: null,
});

function customlogLevel(res: Response, err?: Error) {
  if (err || res.statusCode >= 500) return logLevel.Error;
  if (res.statusCode >= 400) return logLevel.Warn;
  if (res.statusCode >= 300) return logLevel.Silent;
  return logLevel.Info;
}

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1000 + nanoseconds / 100).toFixed(2); // duration in ms

    const level = customlogLevel(res);
    if (level === logLevel.Silent) return;

    logger[level](
      `${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms) `,
    );
  });

  next();
}
