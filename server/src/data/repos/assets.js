import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as U from '../../util';

const fromModel = U.transform({
  id: U.prop('id'),
  filename: U.prop('filename'),
  mimetype: U.prop('mimetype'),
  vault_id: U.prop('vaultId'),
  artifact_id: U.prop('artifactId'),
  creator_id: U.prop('creatorId'),
});

const toModel = U.transform({
  id: U.prop('id'),
  filename: U.prop('filename'),
  mimetype: U.prop('mimetype'),
  vaultId: U.prop('vault_id'),
  artifactId: U.prop('artifact_id'),
  creatorId: U.prop('creator_id'),
});

export const createAssetRepo = ({ assetStore }) => ({
  createAsset: createResource(assetStore, fromModel, toModel),
  readAsset: readResource(assetStore, toModel),
  readAllAssets: readAllResources(
    assetStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  assetExists: resourceExists(assetStore),
  updateAsset: updateResource(assetStore, fromModel, toModel),
  updateAllAssets: updateAllResources(assetStore, fromModel, toModel),
  // del: del(db, table),
});
