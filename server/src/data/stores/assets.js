import { createResourceStore } from '../resource-store';

const newRecordFromAsset = (asset) => ({
  filename: asset.filename,
  mimetype: asset.mimetype,
  collection_id: asset.collectionId,
  artifact_id: asset.artifactId,
  creator_id: asset.creatorId,
});

const assetFromRecord = (record) => ({
  id: record.id,
  filename: record.filename,
  mimetype: record.mimetype,
  collectionId: record.collection_id_id,
  artifactId: record.artifact_id,
  creatorId: record.creator_id,
});

export const createAssetStore = (db) =>
  createResourceStore(db, 'assets', assetFromRecord, newRecordFromAsset);
