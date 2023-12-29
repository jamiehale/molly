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

const readBySecret = J.curry((apiKeysStore, toModel, secret) =>
  apiKeysStore.readSingle({ secret }).then(toModel),
);

export const createApiKeysRepo = ({ apiKeysStore }) => ({
  createApiKey: createResource(apiKeysStore, fromModel, toModel),
  readApiKey: readResource(apiKeysStore, toModel),
  readAllApiKeys: readAllResources(apiKeysStore, fromModel, toModel),
  apiKeyExists: resourceExists(apiKeysStore),
  updateApiKey: updateResource(apiKeysStore, fromModel, toModel),
  updateApiKey: updateAllResources(apiKeysStore, fromModel, toModel),
  // del: del(db, table),
  readApiKeyBySecret: readBySecret(apiKeysStore, toModel),
});
