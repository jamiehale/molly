import { createResourceStore } from '../resource-store';

export const createEventStore = (db) => createResourceStore(db, 'events');
