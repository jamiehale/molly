import { NotFoundError } from '../error';
import { firstRecord, throwIfEmpty, throwIfNil } from '../util';

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

export const createAsset = (db, asset) =>
  db('assets')
    .insert(newRecordFromAsset(asset))
    .returning('*')
    .then(firstRecord)
    .then(assetFromRecord);

const assetsFromRecords = (records) => records.map(assetFromRecord);

export const readAllAssetsByArtifactId = (db, artifactId) =>
  db('assets')
    .where({ artifact_id: artifactId })
    .then(throwIfNil(() => new Error('Error reading assets')))
    .then(assetsFromRecords);

export const readAsset = (db, id) =>
  db('assets')
    .where({ id })
    .then(throwIfNil(() => new Error('Error querying for asset')))
    .then(throwIfEmpty(() => new NotFoundError(`Asset id ${id}`)))
    .then(firstRecord)
    .then(assetFromRecord);
