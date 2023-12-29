import { createResourceStore } from '../resource-store';

export const createGendersStore = (db) => createResourceStore(db, 'genders');
