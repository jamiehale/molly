import {
  routes,
  getSingleResource,
  getAllResources,
  patchResource,
  getAllChildResources,
  postChildResource,
} from '../resource-helpers';
import * as U from '../util';
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

const toResult = U.pick([
  'id',
  'title',
  'description',
  'typeId',
  'sourceId',
  'collectionId',
  'creatorId',
]);

const toAssetResult = U.pick([
  'id',
  'filename',
  'mimetype',
  'vaultId',
  'artifactId',
  'creatorId',
]);

export const artifactRoutes = ({
  artifactRepo,
  artifactTypeRepo,
  artifactSourceRepo,
  assetRepo,
  vaultRepo,
}) =>
  routes([
    getSingleResource(
      '/artifacts/:id',
      artifactRepo.artifactExists,
      ({ params }) => artifactRepo.readArtifact(params.id).then(toResult),
    ),
    getAllResources('/artifacts', V.any(), () =>
      artifactRepo.readAllArtifacts().then(U.map(toResult)),
    ),
    // no post
    patchResource(
      '/artifacts/:id',
      artifactRepo.artifactExists,
      patchBody(
        artifactTypeRepo.artifactTypeExists,
        artifactSourceRepo.artifactSourceExists,
      ),
      ({ params, body }) =>
        artifactRepo
          .updateArtifact(
            params.id,
            U.compose(
              U.filterEmptyProps,
              U.pick(['title', 'description', 'typeId', 'sourceId']),
            )(body),
          )
          .then(toResult),
    ),
    getAllChildResources(
      '/artifacts/:id/assets',
      artifactRepo.artifactExists,
      ({ params }) =>
        assetRepo
          .readAllAssets({ artifactId: params.id })
          .then(U.map(toAssetResult)),
    ),
    postChildResource(
      '/artifacts/:id/assets',
      artifactRepo.artifactExists,
      postAssetBody(vaultRepo.vaultExists),
      ({ userId, params, body }) =>
        assetRepo
          .createAsset(
            U.compose(
              U.assoc('artifactId', params.id),
              U.assoc('creatorId', userId),
              U.pick(['filename', 'mimetype', 'vaultId']),
            )(body),
          )
          .then(toAssetResult),
    ),
  ]);
