import { curry, renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const apiKeyFromRecord = (record) => ({
  id: record.id,
  userId: record.user_id,
  secret: record.secret,
});

const apiKeyKeyMap = {
  id: 'id',
  userId: 'user_id',
  secret: 'secret',
};

export const createApiKeyStore = (db) =>
  createResourceStore(
    db,
    'api_keys',
    apiKeyFromRecord,
    renameKeys(apiKeyKeyMap),
  );
