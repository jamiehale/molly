import { createResourceStore } from '../resource-store';

export const createChildStore = (db) => createResourceStore(db, 'children');
