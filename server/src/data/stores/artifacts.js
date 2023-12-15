import { createResourceStore } from '../resource-store';

const newRecordFromArtifact = (artifact) => ({
  title: artifact.title,
  description: artifact.description,
  type_id: artifact.typeId,
  source_id: artifact.sourceId,
  creator_id: artifact.creatorId,
});

const artifactFromRecord = (record) => ({
  id: record.id,
  title: record.title,
  description: record.description,
  typeId: record.type_id,
  sourceId: record.source_id,
  creatorId: record.creator_id,
});

export const createArtifactStore = (db) =>
  createResourceStore(
    db,
    'artifacts',
    artifactFromRecord,
    newRecordFromArtifact,
  );
