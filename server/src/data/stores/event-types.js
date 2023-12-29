import { createResourceStore } from '../resource-store';

export const createEventTypesStore = (db) =>
  createResourceStore(db, 'event_types');
