import express from 'express';
import { authenticated } from './middleware/authentication';
import { userRoutes } from './resources/users';
import { artifactRoutes } from './resources/artifacts';
import { artifactTypeRoutes } from './resources/artifact-types';
import { assetRoutes } from './resources/assets';
import { eventRoutes } from './resources/events';
import { locationRoutes } from './resources/locations';

export const api = (repos) => {
  const router = express.Router();

  // router.use(authenticated(repos), userRoutes(repos));
  router.use(authenticated(repos), artifactRoutes(repos));
  // router.use(authenticated(repos), artifactTypeRoutes(repos));
  // router.use(authenticated(repos), assetRoutes(repos));
  router.use(authenticated(repos), eventRoutes(repos));
  router.use(authenticated(repos), locationRoutes(repos));

  return router;
};
