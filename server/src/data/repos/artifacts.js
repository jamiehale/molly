import { baseResourceRepo } from '../resource-repo';

export const createArtifactRepo = ({ artifactStore }) => ({
  ...baseResourceRepo('artifact', artifactStore),
  // del: del(db, table),
});
