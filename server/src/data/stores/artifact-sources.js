import { createResourceStore } from '../resource-store';

export const createArtifactSourcesStore = (db) =>
  createResourceStore(db, 'artifact_sources');
