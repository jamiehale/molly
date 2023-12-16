import {
  optionalField,
  routes,
  baseResourceRoutes,
  withUserId,
} from '../resource-helpers';
import { required, optional, validResource } from '../validation';
import { composeP } from '../util';

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

const assetFromPayload = (userId, artifactId, payload) => ({
  filename: payload.filename,
  mimetype: payload.mimetype,
  collectionId: 'main',
  artifactId: artifactId,
  creatorId: userId,
});

const patchArtifactPayload = (artifactTypeRepo, artifactSourceRepo) => ({
  title: optional(),
  description: optional(),
  typeId: validResource(artifactTypeRepo),
  sourceId: validResource(artifactSourceRepo),
});

const artifactFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('description', payload),
  ...optionalField('typeId', payload, 'type_id'),
  ...optionalField('sourceId', payload, 'source_id'),
});

export const artifactRoutes = ({
  artifactRepo,
  artifactTypeRepo,
  artifactSourceRepo,
}) =>
  routes([
    ...baseResourceRoutes(
      'artifact',
      (id) => artifactRepo.artifactExists(id),
      ({ params }) => artifactRepo.readArtifact(params.id),
      () => artifactRepo.readAllArtifacts(),
      postArtifactPayload(artifactTypeRepo, artifactSourceRepo),
      ({ userId, payload }) =>
        artifactRepo.createArtifact(artifactFromPayload(userId, payload)),
      patchArtifactPayload(artifactTypeRepo, artifactSourceRepo),
      ({ params, payload }) =>
        artifactRepo.updateArtifact(
          params.id,
          artifactFieldsFromPayload(payload),
        ),
      withUserId,
    ),
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
