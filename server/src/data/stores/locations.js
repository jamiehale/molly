import { createResourceStore } from '../resource-store';

export const createLocationsStore = (db) =>
  createResourceStore(db, 'locations');
