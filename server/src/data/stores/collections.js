import { createResourceStore } from '../resource-store';

export const createCollectionsStore = (db) =>
  createResourceStore(db, 'collections');
