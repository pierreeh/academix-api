import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { xss } from 'express-xss-sanitizer';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import requestLogger from './middlewares/requestLogger.middleware';
import { handleHttpError } from './middlewares/httpError.middleware';
import { router } from './routes';
import { jwtStrategy } from './middlewares/passport.middleware';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
};

export default function server() {
  const app = express();

  app.use(cors(corsOptions));
  app.use(xss());
  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  app.use(requestLogger);

  app.use('/api', router);

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    handleHttpError(err, res);
  });

  return app;
}
