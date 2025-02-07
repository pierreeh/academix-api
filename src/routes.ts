import express from 'express';

import { authenticate } from './modules/auth/auth.route';

export const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authenticate,
  },
];

routes.forEach(r => {
  router.use(r.path, r.route).all('*', (req, res) => {
    res.status(404).send({ status: 'error', message: 'Route not found.' });
  });
});
