import { createResourceStore } from '../resource-store';

export const createGenderStore = (db) => createResourceStore(db, 'genders');
