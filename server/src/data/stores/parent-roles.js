import { createResourceStore } from '../resource-store';

export const createParentRolesStore = (db) =>
  createResourceStore(db, 'parent_roles');
