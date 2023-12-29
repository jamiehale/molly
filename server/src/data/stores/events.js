import { createResourceStore } from '../resource-store';

export const createEventsStore = (db) => createResourceStore(db, 'events');
