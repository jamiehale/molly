import express from 'express';
import { authenticated } from './middleware/authentication';
import { userRoutes } from './resources/users';
import { artifactRoutes } from './resources/artifacts';
import { artifactTypeRoutes } from './resources/artifact-types';
import { assetRoutes } from './resources/assets';
import { eventRoutes } from './resources/events';

export const api = (db) => {
  const router = express.Router();

  router.use(authenticated(db), userRoutes(db));
  router.use(authenticated(db), artifactRoutes(db));
  router.use(authenticated(db), artifactTypeRoutes(db));
  router.use(authenticated(db), assetRoutes(db));
  router.use(authenticated(db), eventRoutes(db));

  return router;
};
