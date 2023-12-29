import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as J from '../../jlib';

const fromModel = J.transform({
  id: J.prop('id'),
  filename: J.prop('filename'),
  mimetype: J.prop('mimetype'),
  vault_id: J.prop('vaultId'),
  artifact_id: J.prop('artifactId'),
  creator_id: J.prop('creatorId'),
});

const toModel = J.transform({
  id: J.prop('id'),
  filename: J.prop('filename'),
  mimetype: J.prop('mimetype'),
  vaultId: J.prop('vault_id'),
  artifactId: J.prop('artifact_id'),
  creatorId: J.prop('creator_id'),
});

export const createAssetRepo = ({ assetStore }) => ({
  createAsset: createResource(assetStore, fromModel, toModel),
  readAsset: readResource(assetStore, toModel),
  readAllAssets: readAllResources(
    assetStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  assetExists: resourceExists(assetStore),
  updateAsset: updateResource(assetStore, fromModel, toModel),
  updateAllAssets: updateAllResources(assetStore, fromModel, toModel),
  // del: del(db, table),
});
