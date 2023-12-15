import express from 'express';
import { get, withUserId } from '../resource-helpers';
import { readAllArtifactTypes } from '../data/stores/artifact-types';

const getArtifactTypes = (db) => withUserId(() => readAllArtifactTypes(db));

export const artifactTypeRoutes = (db) => {
  const router = express.Router();

  get(router, '/artifact-types', getArtifactTypes(db));

  return router;
};
