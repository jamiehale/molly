import express from 'express';
import { authenticated } from './middleware/authentication.js';
import { mobjectRoutes } from './resources/mobjects.js';

export const api = (config, repos) => {
  const router = express.Router();

  router.use(authenticated(repos), mobjectRoutes(config, repos));

  return router;
};
