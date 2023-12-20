import { ParameterError } from '../error';
import {
  routes,
  getSingleResource,
  getAllResources,
  patchResource,
} from '../resource-helpers';
import * as U from '../util';
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

const toResult = U.pick([
  'id',
  'filename',
  'mimetype',
  'vaultId',
  'artifactId',
  'creatorId',
]);

export const assetRoutes = ({ assetRepo, vaultRepo }) =>
  routes([
    getSingleResource('/assets/:id', assetRepo.assetExists, ({ params }) =>
      assetRepo.readAsset(params.id).then(toResult),
    ),
    getAllResources('/assets', V.any(), () =>
      assetRepo.readAllAssets().then(U.map(toResult)),
    ),
    // no post
    patchResource(
      '/assets/:id',
      assetRepo.assetExists,
      patchBody(vaultRepo.vaultExists),
      ({ params, body }) =>
        assetRepo
          .updateAsset(
            params.id,
            U.compose(
              U.filterEmptyProps,
              U.pick(['filename', 'mimetype', 'vaultId']),
            )(body),
          )
          .then(toResult),
    ),
  ]);
