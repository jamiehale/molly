import {
  routes,
  getSingleResource,
  getAllResources,
  patchResource,
  getAllChildResources,
  postChildResource,
} from '../resource-helpers';
import * as J from '../jlib';
import * as V from '../validation';

const postAssetBody = (validVaultFn) =>
  V.object({
    filename: V.and(V.required(), V.isNotNull()),
    mimetype: V.and(V.required(), V.isNotNull()),
    vaultId: V.and(V.required(), V.isNotNull(), V.validResource(validVaultFn)),
  });

const patchBody = (validArtifactTypeFn, validArtifactSourceFn) =>
  V.and(
    V.object({
      title: V.optional(V.isNotNull()),
      description: V.optional(),
      typeId: V.optional(
        V.and(V.isNotNull(), V.validResource(validArtifactTypeFn)),
      ),
      sourceId: V.optional(
        V.and(V.isNotNull(), V.validResource(validArtifactSourceFn)),
      ),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const toResult = J.pick([
  'id',
  'title',
  'description',
  'typeId',
  'sourceId',
  'collectionId',
  'creatorId',
]);

const toAssetResult = J.pick([
  'id',
  'filename',
  'mimetype',
  'vaultId',
  'artifactId',
  'creatorId',
]);

const toArtifactPersonResult = J.pick([]);

export const artifactRoutes = ({
  artifactPeopleRepo,
  artifactsRepo,
  artifactTypesRepo,
  artifactSourcesRepo,
  assetsRepo,
  vaultsRepo,
}) =>
  routes([
    getSingleResource(
      '/artifacts/:id',
      artifactsRepo.artifactExists,
      ({ params }) => artifactsRepo.readArtifact(params.id).then(toResult),
    ),
    getAllResources('/artifacts', V.any(), () =>
      artifactsRepo.readAllArtifacts().then(J.map(toResult)),
    ),
    // no post
    patchResource(
      '/artifacts/:id',
      artifactsRepo.artifactExists,
      patchBody(
        artifactTypesRepo.artifactTypeExists,
        artifactSourcesRepo.artifactSourceExists,
      ),
      ({ params, body }) =>
        artifactsRepo
          .updateArtifact(
            params.id,
            J.compose(
              J.filterEmptyProps,
              J.pick(['title', 'description', 'typeId', 'sourceId']),
            )(body),
          )
          .then(toResult),
    ),
    getAllChildResources(
      '/artifacts/:id/assets',
      artifactsRepo.artifactExists,
      ({ params }) =>
        assetsRepo
          .readAllAssets({ artifactId: params.id })
          .then(J.map(toAssetResult)),
    ),
    postChildResource(
      '/artifacts/:id/assets',
      artifactsRepo.artifactExists,
      postAssetBody(vaultsRepo.vaultExists),
      ({ userId, params, body }) =>
        assetsRepo
          .createAsset(
            J.compose(
              J.assoc('artifactId', params.id),
              J.assoc('creatorId', userId),
              J.pick(['filename', 'mimetype', 'vaultId']),
            )(body),
          )
          .then(toAssetResult),
    ),
    getAllChildResources(
      '/artifacts/:id/people',
      artifactsRepo.artifactExists,
      ({ params }) =>
        artifactPeopleRepo
          .readAllArtifactPeople({ artifactId: params.id })
          .then(J.map(toArtifactPersonResult)),
    ),
  ]);
