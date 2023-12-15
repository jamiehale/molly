import express from 'express';
import {
  get,
  post,
  patch,
  withUserId,
  withPayload,
  withParams,
  optionalField,
  getAllResources,
  getSingleResource,
  postResource,
  patchResource,
} from '../resource-helpers';
import {
  readAllArtifacts,
  readArtifact,
  createArtifact,
  updateArtifact,
  artifactExists,
} from '../data/stores/artifacts';
import { createAsset, readAllAssetsByArtifactId } from '../data/stores/assets';
import { required, optional, validResource } from '../validation';
import { composeP, curry } from '../util';

const postArtifactPayload = (artifactTypeRepo, artifactSourceRepo) => ({
  title: required(),
  typeId: composeP(required(), validResource(artifactTypeRepo)),
  sourceId: composeP(required(), validResource(artifactSourceRepo)),
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

const artifactParams = (repo) => ({
  id: composeP(required(), validResource(repo)),
});

const assetFromPayload = (userId, artifactId, payload) => ({
  filename: payload.filename,
  mimetype: payload.mimetype,
  collectionId: 'main',
  artifactId: artifactId,
  creatorId: userId,
});

const patchArtifactPayload = (artifactTypeRepo, artifactSourceRepo) => ({
  title: optional,
  description: optional,
  typeId: validResource(artifactTypeRepo),
  sourceId: validResource(artifactSourceRepo),
});

const artifactFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('description', payload),
  ...optionalField('typeId', payload, 'type_id'),
  ...optionalField('sourceId', payload, 'source_id'),
});

// const getAllChildResources = curry((path, repo, ))
export const artifactRoutes = ({
  artifactRepo,
  artifactTypeRepo,
  artifactSourceRepo,
}) =>
  routes([
    getAllResources('/artifacts', artifactRepo),
    getSingleResource('/artifacts', artifactRepo),
    postResource(
      '/artifacts',
      artifactRepo,
      postArtifactPayload(artifactTypeRepo, artifactSourceRepo),
    ),
    patchResource(
      '/artifacts',
      artifactRepo,
      patchArtifactPayload(artifactTypeRepo, artifactSourceRepo),
    ),
    // (router) =>
    //   router.get(
    //     '/artifacts/:id/assets',
    //     withInitialContext(
    //       withErrorHandling(
    //         withJsonResponse(
    //           withParams(artifactParams(artifactRepo), (context) =>
    //             readAllAssetsByArtifactId(db, context.params.id),
    //           ),
    //         ),
    //       ),
    //     ),
    //   ),
  ]);

/*
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
*/
