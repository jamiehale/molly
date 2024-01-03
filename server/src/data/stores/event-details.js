import { createResourceStore } from '../resource-store';

export const createEventDetailsStore = (db) => ({
  ...createResourceStore(db, 'event_details'),
});
