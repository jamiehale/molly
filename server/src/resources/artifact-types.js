import express from 'express';
import { get, withAuthentication } from '../resource-helpers';
import { readAllArtifactTypes } from '../data/artifact-types';

const getArtifactTypes = (db) =>
  withAuthentication(() => readAllArtifactTypes(db));

export const artifactTypeRoutes = (db) => {
  const router = express.Router();

  get(router, '/artifact-types', getArtifactTypes(db));

  return router;
};
