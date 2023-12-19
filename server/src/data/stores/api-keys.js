import { createResourceStore } from '../resource-store';

export const createApiKeyStore = (db) => createResourceStore(db, 'api_keys');
