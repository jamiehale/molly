import { createResourceStore } from '../resource-store.js';

export const createFilesStore = (db) => createResourceStore(db, 'files');
