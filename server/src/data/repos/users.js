import { baseResourceRepo } from '../resource-repo';

export const createUserRepo = ({ userStore }) => ({
  ...baseResourceRepo('user', userStore),
  // del: del(db, table),
});
