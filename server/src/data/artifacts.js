import { firstRecord } from '../util';

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

const artifactsFromRecords = (records) => records.map(artifactFromRecord);

export const createArtifact = (db, artifact) =>
  db('artifacts')
    .insert(newRecordFromArtifact(artifact))
    .returning('*')
    .then(firstRecord)
    .then(artifactFromRecord);

export const readAllArtifacts = (db) =>
  db('artifacts').select('*').then(artifactsFromRecords);
