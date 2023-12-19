import { createResourceStore } from '../resource-store';

export const createLocationStore = (db) => createResourceStore(db, 'locations');
