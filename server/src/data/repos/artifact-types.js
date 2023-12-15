import { baseResourceRepo } from '../resource-repo';

export const createArtifactTypeRepo = ({ artifactTypeStore }) => ({
  ...baseResourceRepo('artifactType', artifactTypeStore),
  // del: del(db, table),
});
