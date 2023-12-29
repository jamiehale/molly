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
  user_id: J.prop('userId'),
  secret: J.prop('secret'),
});

const toModel = J.transform({
  id: J.prop('id'),
  userId: J.prop('user_id'),
  secret: J.prop('secret'),
});

const readBySecret = J.curry((apiKeyStore, toModel, secret) =>
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
