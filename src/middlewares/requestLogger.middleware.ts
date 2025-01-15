import { NextFunction, Request, Response } from "express";
import pino from "pino";

const LogLevel = {
  Fatal: "fatal",
  Error: "error",
  Warn: "warn",
  Info: "info",
  Debug: "debug",
  Trace: "trace",
  Silent: "silent",
};

const logger: any = pino({
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  base: null,
});

function customLogLevel(res: Response, err?: any) {
  if (err || res.statusCode >= 500) return LogLevel.Error;
  if (res.statusCode >= 400) return LogLevel.Warn;
  if (res.statusCode >= 300) return LogLevel.Silent;
  return LogLevel.Info;
}

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2); // duration in ms

    const level = customLogLevel(res);
    if (level === LogLevel.Silent) return;

    logger[level](
      `${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms) `
    );
  });

  next();
}
