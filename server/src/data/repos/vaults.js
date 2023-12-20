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
  title: U.prop('title'),
  description: U.prop('description'),
  base_url: U.prop('baseUrl'),
});

const toModel = U.transform({
  id: U.prop('id'),
  title: U.prop('title'),
  description: U.prop('description'),
  baseUrl: U.prop('base_url'),
});

export const createVaultRepo = ({ vaultStore }) => ({
  createVault: createResource(vaultStore, fromModel, toModel),
  readVault: readResource(vaultStore, toModel),
  readAllVaults: readAllResources(
    vaultStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  vaultExists: resourceExists(vaultStore),
  updateVault: updateResource(vaultStore, fromModel, toModel),
  updateAllVaults: updateAllResources(vaultStore, fromModel, toModel),
  // del: del(db, table),
});
