import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const userFromRecord = (record) => ({
  id: record.id,
  accountId: record.account_id,
});

const userKeyMap = {
  id: 'id',
  accountId: 'account_id',
};

export const createUsersStore = (db) =>
  createResourceStore(db, 'users', userFromRecord, renameKeys(userKeyMap));
