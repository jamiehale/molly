import { createResourceStore } from '../resource-store';

export const createArtifactCollectionsStore = (db) =>
  createResourceStore(db, 'artifact_collections');
