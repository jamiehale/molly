import { createResourceStore } from '../resource-store';

export const createEventPeopleStore = (db) =>
  createResourceStore(db, 'event_people');
