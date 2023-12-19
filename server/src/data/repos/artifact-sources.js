import { baseResourceRepo } from '../resource-repo';

export const createArtifactSourceRepo = ({ artifactSourceStore }) => ({
  ...baseResourceRepo('artifactSource', artifactSourceStore),
  // del: del(db, table),
});
