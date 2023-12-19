import { createResourceStore } from '../resource-store';

export const createArtifactStore = (db) => createResourceStore(db, 'artifacts');
