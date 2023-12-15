import { createResourceStore } from '../resource-store';

const apiKeyFromRecord = (record) => ({
  id: record.id,
  userId: record.user_id,
  secret: record.secret,
});

export const createApiKeyStore = (db) =>
  createResourceStore(db, 'api_keys', apiKeyFromRecord, {});
