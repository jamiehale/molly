import { createResourceStore } from '../resource-store';

export const createParentRoleStore = (db) =>
  createResourceStore(db, 'parent_roles');
