import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { loginUser, registerUser } from './auth.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateToken(payload: any, expiresIn: any) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstname, lastname, email, password } = req.body;
    await registerUser(firstname, lastname, email, password);

    res
      .status(201)
      .json({ status: 'success', message: 'Registered successfully.' });
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const token = generateToken(
      {
        id: user?.id,
        email: user?.email,
        firstname: user?.firstname,
        lastname: user?.lastname,
      },
      '30d',
    );
    res.cookie('x-access-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'developement',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ status: 'success', message: 'Logged in successfully.' });
  } catch (e) {
    next(e);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.cookie('x-access-token', '', { httpOnly: true, expires: new Date(0) });

    res
      .status(200)
      .send({ status: 'success', message: 'Logged out successfully.' });
  } catch (e) {
    next(e);
  }
}
