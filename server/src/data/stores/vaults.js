import { createResourceStore } from '../resource-store';

export const createVaultStore = (db) => createResourceStore(db, 'vaults');
