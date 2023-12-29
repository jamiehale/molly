import { createResourceStore } from '../resource-store';

export const createArtifactTypesStore = (db) =>
  createResourceStore(db, 'artifact_types');
