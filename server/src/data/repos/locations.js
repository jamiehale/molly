import { baseResourceRepo } from '../resource-repo';

export const createLocationRepo = ({ locationStore }) => ({
  ...baseResourceRepo('location', locationStore),
  // del: del(db, table),
});
