import { baseResourceRepo } from '../resource-repo';

export const createEventRepo = ({ eventStore }) => ({
  ...baseResourceRepo('event', eventStore),
  // del: del(db, table),
});
