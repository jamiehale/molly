import { createResourceStore } from '../resource-store';

export const createArtifactCollectionStore = (db) =>
  createResourceStore(db, 'artifact_collections');
