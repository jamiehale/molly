import { createResourceStore } from '../resource-store';

export const createAssetStore = (db) => createResourceStore(db, 'assets');
