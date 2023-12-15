import { baseResourceRepo } from '../resource-repo';

export const createEventTypeRepo = ({ eventTypeStore }) => ({
  ...baseResourceRepo('eventType', eventTypeStore),
  // del: del(db, table),
});
