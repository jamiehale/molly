import { createResourceStore } from '../resource-store';

export const createArtifactSourceStore = (db) =>
  createResourceStore(db, 'artifact_sources');
