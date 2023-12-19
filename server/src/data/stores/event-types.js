import { createResourceStore } from '../resource-store';

export const createEventTypeStore = (db) =>
  createResourceStore(db, 'event_types');
