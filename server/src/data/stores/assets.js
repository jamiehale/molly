import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const assetKeyMap = {
  id: 'id',
  filename: 'filename',
  mimetype: 'mimetype',
  collectionId: 'collection_id',
  artifactId: 'artifact_id',
  creatorId: 'creator_id',
};

const assetFromRecord = (record) => ({
  id: record.id,
  filename: record.filename,
  mimetype: record.mimetype,
  collectionId: record.collection_id_id,
  artifactId: record.artifact_id,
  creatorId: record.creator_id,
});

export const createAssetStore = (db) =>
  createResourceStore(db, 'assets', assetFromRecord, renameKeys(assetKeyMap));
