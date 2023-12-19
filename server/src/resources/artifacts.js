import {
  optionalField,
  routes,
  baseResourceRoutes,
  withUserId,
  withInitialContext,
  withErrorHandling,
  withJsonResponse,
  withParams,
  resourceParams,
} from '../resource-helpers';
import { required, optional, validResource, isNotNull } from '../validation';
import { composeP } from '../util';

const postArtifactPayload = (artifactTypeRepo, artifactSourceRepo) => ({
  title: composeP(isNotNull(), required()),
  typeId: composeP(
    validResource((id) => artifactTypeRepo.artifactTypeExists(id)),
    isNotNull(),
    required(),
  ),
  sourceId: composeP(
    validResource((id) => artifactSourceRepo.artifactSourceExists(id)),
    isNotNull(),
    required(),
  ),
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
  title: optional(isNotNull()),
  description: optional(),
  typeId: optional(
    composeP(
      validResource((id) => artifactTypeRepo.artifactTypeExists(id)),
      isNotNull(),
    ),
  ),
  sourceId: optional(
    composeP(
      validResource((id) => artifactSourceRepo.artifactSourceExists(id)),
      isNotNull(),
    ),
  ),
});

const artifactFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('description', payload),
  ...optionalField('typeId', payload),
  ...optionalField('sourceId', payload),
});

export const artifactRoutes = ({
  artifactRepo,
  artifactTypeRepo,
  artifactSourceRepo,
  assetRepo,
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
    (router) =>
      router.get(
        '/artifacts/:id/assets',
        withInitialContext(
          withErrorHandling(
            withUserId(
              withJsonResponse(
                withParams(
                  resourceParams((id) => artifactRepo.artifactExists(id)),
                  ({ params }) =>
                    assetRepo.readAllAssets({ artifactId: params.id }),
                ),
              ),
            ),
          ),
        ),
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
