import { createResourceStore } from '../resource-store';

export const createParentChildrenStore = (db) =>
  createResourceStore(db, 'parent_children');
