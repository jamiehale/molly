import { curry } from '../../util';
import { baseResourceRepo } from '../resource-repo';

const readBySecret = curry((apiKeyStore, secret) =>
  apiKeyStore.readSingle({ secret }),
);

export const createApiKeyRepo = ({ apiKeyStore }) => ({
  ...baseResourceRepo('apiKey', apiKeyStore),
  // del: del(db, table),
  readApiKeyBySecret: readBySecret(apiKeyStore),
});
