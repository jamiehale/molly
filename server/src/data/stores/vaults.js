import { createResourceStore } from '../resource-store';

export const createVaultsStore = (db) => createResourceStore(db, 'vaults');
