import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import { HandleHttpError } from './httpError.middleware';

const verify =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req: Request, res: Response, resolve: any, reject: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (e: any, user: any) => {
      if (e || !user) {
        return reject(new HandleHttpError(401, 'Authorization required.'));
      }

      req.user = user;
      resolve();
    };

export const auth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verify(req, res, resolve, reject),
      )(req, res, next);
    })
      .then(() => next())
      .catch(e => next(e));
  };
