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

export const createVaultsRepo = ({ vaultsStore }) => ({
  createVault: createResource(vaultsStore, fromModel, toModel),
  readVault: readResource(vaultsStore, toModel),
  readAllVaults: readAllResources(
    vaultsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  vaultExists: resourceExists(vaultsStore),
  updateVault: updateResource(vaultsStore, fromModel, toModel),
  updateAllVaults: updateAllResources(vaultsStore, fromModel, toModel),
  // del: del(db, table),
});
