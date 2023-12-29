import { ParameterError } from '../error';
import {
  routes,
  getSingleResource,
  getAllResources,
  patchResource,
} from '../resource-helpers';
import * as J from '../jlib';
import * as V from '../validation';

const patchBody = (validVaultFn) =>
  V.and(
    V.object({
      filename: V.optional(V.isNotNull()),
      mimetype: V.optional(V.isNotNull()),
      vaultId: V.optional(V.and(V.isNotNull(), V.validResource(validVaultFn))),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const toResult = J.pick([
  'id',
  'filename',
  'mimetype',
  'vaultId',
  'artifactId',
  'creatorId',
]);

export const assetRoutes = ({ assetsRepo, vaultsRepo }) =>
  routes([
    getSingleResource('/assets/:id', assetsRepo.assetExists, ({ params }) =>
      assetsRepo.readAsset(params.id).then(toResult),
    ),
    getAllResources('/assets', V.any(), () =>
      assetsRepo.readAllAssets().then(J.map(toResult)),
    ),
    // no post
    patchResource(
      '/assets/:id',
      assetsRepo.assetExists,
      patchBody(vaultsRepo.vaultExists),
      ({ params, body }) =>
        assetsRepo
          .updateAsset(
            params.id,
            J.compose(
              J.filterEmptyProps,
              J.pick(['filename', 'mimetype', 'vaultId']),
            )(body),
          )
          .then(toResult),
    ),
  ]);
