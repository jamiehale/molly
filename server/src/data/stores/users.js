import { createResourceStore } from '../resource-store';

export const createUsersStore = (db) => createResourceStore(db, 'users');
