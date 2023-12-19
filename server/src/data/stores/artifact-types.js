import { createResourceStore } from '../resource-store';

export const createArtifactTypeStore = (db) =>
  createResourceStore(db, 'artifact_types');
