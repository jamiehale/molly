import { createResourceStore } from '../resource-store';

export const createArtifactsStore = (db) =>
  createResourceStore(db, 'artifacts');
