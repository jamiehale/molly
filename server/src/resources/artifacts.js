import express from 'express';
import {
  get,
  post,
  withAuthentication,
  withPayload,
  withParams,
} from '../resource-helpers';
import { readAllArtifacts, createArtifact } from '../data/artifacts';
import { createAsset, readAllAssetsByArtifactId } from '../data/assets';
import {
  required,
  validArtifactType,
  validArtifactSource,
  validArtifactId,
} from '../validation';

const getArtifacts = (db) => withAuthentication(() => readAllArtifacts(db));

const newArtifactDescriptor = (db) => ({
  title: required(),
  typeId: required(validArtifactType(db)),
  sourceId: required(validArtifactSource(db)),
});

const artifactFromPayload = (userId, payload) => ({
  title: payload.title,
  description: payload.description,
  typeId: payload.typeId,
  sourceId: payload.sourceId,
  creatorId: userId,
});

const postArtifact = (db) =>
  withAuthentication(
    withPayload(newArtifactDescriptor(db), (context) =>
      createArtifact(db, artifactFromPayload(context.userId, context.payload)),
    ),
  );

const newArtifactAssetDescriptor = () => ({
  filename: required(),
  mimetype: required(),
});

const artifactParams = (db) => ({
  id: required(validArtifactId(db)),
});

const assetFromPayload = (userId, artifactId, payload) => ({
  filename: payload.filename,
  mimetype: payload.mimetype,
  collectionId: 'main',
  artifactId: artifactId,
  creatorId: userId,
});

const withDebug = (message, fn) => async (context) => {
  console.log(`Context (${message}):`, context);
  const result = await fn(context);
  console.log(`Context after (${message})`, context);
  return result;
};

const getArtifactAssets = (db) =>
  withAuthentication(
    withParams(artifactParams(db), (context) =>
      readAllAssetsByArtifactId(db, context.params.id),
    ),
  );

const postArtifactAsset = (db) =>
  withAuthentication(
    withParams(
      artifactParams(db),
      withPayload(newArtifactAssetDescriptor(), (context) =>
        createAsset(
          db,
          assetFromPayload(context.userId, context.params.id, context.payload),
        ),
      ),
    ),
  );

export const artifactRoutes = (db) => {
  const router = express.Router();

  get(router, '/artifacts', getArtifacts(db));
  post(router, '/artifacts', postArtifact(db));

  get(router, '/artifacts/:id/assets', getArtifactAssets(db));
  post(router, '/artifacts/:id/assets', postArtifactAsset(db));

  return router;
};
