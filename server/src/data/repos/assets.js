import { baseResourceRepo } from '../resource-repo';

export const createAssetRepo = ({ assetStore }) => ({
  ...baseResourceRepo('asset', assetStore),
  // del: del(db, table),
});
