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
  user_id: U.prop('userId'),
  secret: U.prop('secret'),
});

const toModel = U.transform({
  id: U.prop('id'),
  userId: U.prop('user_id'),
  secret: U.prop('secret'),
});

const readBySecret = U.curry((apiKeyStore, toModel, secret) =>
  apiKeyStore.readSingle({ secret }).then(toModel),
);

export const createApiKeyRepo = ({ apiKeyStore }) => ({
  createApiKey: createResource(apiKeyStore, fromModel, toModel),
  readApiKey: readResource(apiKeyStore, toModel),
  readAllApiKeys: readAllResources(apiKeyStore, fromModel, toModel),
  apiKeyExists: resourceExists(apiKeyStore),
  updateApiKey: updateResource(apiKeyStore, fromModel, toModel),
  updateApiKey: updateAllResources(apiKeyStore, fromModel, toModel),
  // del: del(db, table),
  readApiKeyBySecret: readBySecret(apiKeyStore, toModel),
});
