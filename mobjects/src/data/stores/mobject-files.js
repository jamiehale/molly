import { createResourceStore } from '../resource-store.js';

export const createMobjectFilesStore = (db) => createResourceStore(db, 'mobject_files', true);
