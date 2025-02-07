import 'dotenv/config';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { db } from '@/config/db';

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function jwtVerify(payload: any, done: any) {
  try {
    const user = await db.user.findUnique({ where: { id: payload.id } });
    if (!user) return done(null, false);

    done(null, user);
  } catch (e) {
    done(e, false);
  }
}

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
