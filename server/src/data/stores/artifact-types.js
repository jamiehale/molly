import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const artifactTypeFromRecord = (record) => ({
  id: record.id,
  title: record.title,
});

const artifactTypeKeyMap = {
  id: 'id',
  title: 'title',
};

export const createArtifactTypeStore = (db) =>
  createResourceStore(
    db,
    'artifact_types',
    artifactTypeFromRecord,
    renameKeys(artifactTypeKeyMap),
  );
