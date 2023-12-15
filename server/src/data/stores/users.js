import { createResourceStore } from '../resource-store';

const userFromRecord = (record) => ({
  id: record.id,
  accountId: record.account_id,
});

export const createUsersStore = (db) =>
  createResourceStore(db, 'users', userFromRecord, {});
