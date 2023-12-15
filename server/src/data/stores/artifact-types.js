import { createResourceStore } from '../resource-store';

const artifactTypeFromRecord = (record) => ({
  id: record.id,
  title: record.title,
});

export const createArtifactTypeStore = (db) =>
  createResourceStore(db, 'artifact_types', artifactTypeFromRecord, {});
