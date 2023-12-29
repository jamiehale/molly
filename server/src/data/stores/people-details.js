import { createResourceStore } from '../resource-store';

export const createPeopleDetailsStore = (db) =>
  createResourceStore(db, 'people_details');
