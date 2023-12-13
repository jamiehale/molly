import express from 'express';
import {
  get,
  post,
  patch,
  withUserId,
  withPayload,
  withParams,
  optionalField,
} from '../resource-helpers';
import {
  readAllArtifacts,
  readArtifact,
  createArtifact,
  updateArtifact,
} from '../data/artifacts';
import { createAsset, readAllAssetsByArtifactId } from '../data/assets';
import {
  required,
  optional,
  validArtifactType,
  validArtifactSource,
  validArtifactId,
} from '../validation';

const postArtifactPayload = (db) => ({
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

const postArtifactAssetPayload = () => ({
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

const patchArtifactPayload = (db) => ({
  title: optional(),
  description: optional(),
  typeId: optional(validArtifactType(db)),
  sourceId: optional(validArtifactSource(db)),
});

const artifactFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('description', payload),
  ...optionalField('typeId', payload, 'type_id'),
  ...optionalField('sourceId', payload, 'source_id'),
});

export const artifactRoutes = (db) => {
  const router = express.Router();

  // artifacts
  get(router, '/artifacts', () => readAllArtifacts(db));

  get(
    router,
    '/artifacts/:id',
    withParams(artifactParams(db), (context) =>
      readArtifact(db, context.params.id),
    ),
  );

  post(
    router,
    '/artifacts',
    withUserId(
      withPayload(postArtifactPayload(db), (context) =>
        createArtifact(
          db,
          artifactFromPayload(context.userId, context.payload),
        ),
      ),
    ),
  );

  patch(
    router,
    '/artifacts/:id',
    withParams(
      artifactParams(db),
      withPayload(patchArtifactPayload(db), (context) =>
        updateArtifact(
          db,
          context.params.id,
          artifactFieldsFromPayload(context.payload),
        ),
      ),
    ),
  );

  // assets
  get(
    router,
    '/artifacts/:id/assets',
    withParams(artifactParams(db), (context) =>
      readAllAssetsByArtifactId(db, context.params.id),
    ),
  );

  post(
    router,
    '/artifacts/:id/assets',
    withParams(
      artifactParams(db),
      withUserId(
        withPayload(postArtifactAssetPayload(), (context) =>
          createAsset(
            db,
            assetFromPayload(
              context.userId,
              context.params.id,
              context.payload,
            ),
          ),
        ),
      ),
    ),
  );

  return router;
};
