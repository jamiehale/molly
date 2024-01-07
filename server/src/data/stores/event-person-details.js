import { createResourceStore } from '../resource-store';

export const createEventPersonDetailsStore = (db) =>
  createResourceStore(db, 'event_person_details');
