import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const artifactCollectionKeyMap = {
  id: 'id',
  title: 'title',
  shortName: 'short_name',
  description: 'description',
  creatorId: 'creator_id',
};

const artifactCollectionFromRecord = (record) => ({
  id: record.id,
  title: record.title,
  shortName: record.short_name,
  description: record.description,
  creatorId: record.creator_id,
});

export const createArtifactCollectionStore = (db) =>
  createResourceStore(
    db,
    'artifact_collections',
    artifactCollectionFromRecord,
    renameKeys(artifactCollectionKeyMap),
  );
