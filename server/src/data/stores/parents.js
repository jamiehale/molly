import { createResourceStore } from '../resource-store';

export const createParentStore = (db) => createResourceStore(db, 'parents');
