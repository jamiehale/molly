import express from 'express';
import { authenticated } from './middleware/authentication';
// import { userRoutes } from './resources/users';
import { artifactRoutes } from './resources/artifacts';
import { artifactTypeRoutes } from './resources/artifact-types';
import { assetRoutes } from './resources/assets';
import { eventRoutes } from './resources/events';
import { locationRoutes } from './resources/locations';
import { artifactSourceRoutes } from './resources/artifact-sources';
import { collectionRoutes } from './resources/collections';
import { eventTypeRoutes } from './resources/event-types';
import { genderRoutes } from './resources/genders';
import { personRoutes } from './resources/people';
import { parentRoleRoutes } from './resources/parent-roles';
import { eventPersonRoleRoutes } from './resources/event-person-roles';
import { eventArtifactRoleRoutes } from './resources/event-artifact-roles';

export const api = (repos) => {
  const router = express.Router();

  // router.use(authenticated(repos), userRoutes(repos));
  router.use(authenticated(repos), artifactSourceRoutes(repos));
  router.use(authenticated(repos), artifactRoutes(repos));
  router.use(authenticated(repos), artifactTypeRoutes(repos));
  router.use(authenticated(repos), assetRoutes(repos));
  router.use(authenticated(repos), collectionRoutes(repos));
  router.use(authenticated(repos), eventArtifactRoleRoutes(repos));
  router.use(authenticated(repos), eventPersonRoleRoutes(repos));
  router.use(authenticated(repos), eventRoutes(repos));
  router.use(authenticated(repos), eventTypeRoutes(repos));
  router.use(authenticated(repos), genderRoutes(repos));
  router.use(authenticated(repos), locationRoutes(repos));
  router.use(authenticated(repos), parentRoleRoutes(repos));
  router.use(authenticated(repos), personRoutes(repos));

  return router;
};
