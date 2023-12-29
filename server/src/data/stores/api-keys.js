import { createResourceStore } from '../resource-store';

export const createApiKeysStore = (db) => createResourceStore(db, 'api_keys');
