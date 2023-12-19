import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const artifactSourceFromRecord = (record) => ({
  id: record.id,
  title: record.title,
});

const artifactSourceKeyMap = {
  id: 'id',
  title: 'title',
};

export const createArtifactSourceStore = (db) =>
  createResourceStore(
    db,
    'artifact_sources',
    artifactSourceFromRecord,
    renameKeys(artifactSourceKeyMap),
  );
