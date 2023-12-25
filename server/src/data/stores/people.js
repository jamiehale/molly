import { createResourceStore } from '../resource-store';

export const createPersonStore = (db) => createResourceStore(db, 'people');
