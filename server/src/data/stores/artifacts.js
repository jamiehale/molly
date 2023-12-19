import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const artifactKeyMap = {
  id: 'id',
  title: 'title',
  description: 'description',
  typeId: 'type_id',
  sourceId: 'source_id',
  collectionId: 'collection_id',
  creatorId: 'creator_id',
};

const artifactFromRecord = (record) => ({
  id: record.id,
  title: record.title,
  description: record.description,
  typeId: record.type_id,
  sourceId: record.source_id,
  collectionId: record.collection_id,
  creatorId: record.creator_id,
});

export const createArtifactStore = (db) =>
  createResourceStore(
    db,
    'artifacts',
    artifactFromRecord,
    renameKeys(artifactKeyMap),
  );
