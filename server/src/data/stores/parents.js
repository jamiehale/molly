import { createResourceStore } from '../resource-store';

export const createParentsStore = (db) => createResourceStore(db, 'parents');
