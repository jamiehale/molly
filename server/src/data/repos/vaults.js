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
  title: J.prop('title'),
  description: J.prop('description'),
  base_url: J.prop('baseUrl'),
});

const toModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
  description: J.prop('description'),
  baseUrl: J.prop('base_url'),
});

export const createVaultRepo = ({ vaultStore }) => ({
  createVault: createResource(vaultStore, fromModel, toModel),
  readVault: readResource(vaultStore, toModel),
  readAllVaults: readAllResources(
    vaultStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  vaultExists: resourceExists(vaultStore),
  updateVault: updateResource(vaultStore, fromModel, toModel),
  updateAllVaults: updateAllResources(vaultStore, fromModel, toModel),
  // del: del(db, table),
});
