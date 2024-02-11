import { createResourceStore } from '../resource-store.js';

export const createMobjectsStore = (db) =>
  createResourceStore(db, 'mobjects', true);
