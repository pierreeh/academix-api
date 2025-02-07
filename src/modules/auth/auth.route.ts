import express from 'express';

import { schemaValidator } from '@/middlewares/schemaValidator.middleware';
import { auth } from '@/middlewares/auth.middleware';
import { LoginUserSchema, RegisterUserSchema } from './auth.schema';
import { login, register, logout } from './auth.controller';

export const authenticate = express.Router();

authenticate.post('/register', schemaValidator(RegisterUserSchema), register);
authenticate.post('/login', schemaValidator(LoginUserSchema), login);
authenticate.post('/logout', auth(), logout);
authenticate.all('*', (req, res) => {
  res
    .status(405)
    .send({ status: 'error', message: `Method ${req.method} not allowed.` });
});
