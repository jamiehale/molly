import { createViewStore } from '../view-store.js';

export const createMobjectDetailsStore = (db) => createViewStore(db, 'mobject_details');
