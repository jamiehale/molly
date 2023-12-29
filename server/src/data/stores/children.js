import { createResourceStore } from '../resource-store';

export const createChildrenStore = (db) => createResourceStore(db, 'children');
