import { createResourceStore } from '../resource-store.js';

export const createAttributesStore = (db) => createResourceStore(db, 'attributes');
