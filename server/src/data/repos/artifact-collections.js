import { baseResourceRepo } from '../resource-repo';

export const createArtifactCollectionRepo = ({ artifactCollectionStore }) => ({
  ...baseResourceRepo('artifactCollection', artifactCollectionStore),
  // del: del(db, table),
});
