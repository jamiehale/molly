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

export const createAssetsRepo = ({ assetsStore }) => ({
  createAsset: createResource(assetsStore, fromModel, toModel),
  readAsset: readResource(assetsStore, toModel),
  readAllAssets: readAllResources(
    assetsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  assetExists: resourceExists(assetsStore),
  updateAsset: updateResource(assetsStore, fromModel, toModel),
  updateAllAssets: updateAllResources(assetsStore, fromModel, toModel),
  // del: del(db, table),
});
