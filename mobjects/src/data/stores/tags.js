import { createResourceStore } from '../resource-store.js';

export const createTagsStore = (db) => createResourceStore(db, 'tags');
