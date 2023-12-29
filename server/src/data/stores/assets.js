import { createResourceStore } from '../resource-store';

export const createAssetsStore = (db) => createResourceStore(db, 'assets');
