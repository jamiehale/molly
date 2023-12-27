import { createResourceStore } from '../resource-store';

export const createParentChildStore = (db) =>
  createResourceStore(db, 'parent_children');
