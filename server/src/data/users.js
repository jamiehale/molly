import { firstRecord } from '../util';

const userFromRecord = (record) => ({
  id: record.id,
  accountId: record.account_id,
});

const apiKeyFromRecord = (record) => ({
  id: record.id,
  userId: record.user_id,
  secret: record.secret,
});

const usersFromRecords = (records) => records.map(userFromRecord);

export const readAllUsers = (db) =>
  db('users').select('*').then(usersFromRecords);
export const readApiKeyBySecret = (db, secret) =>
  db('api_keys').where({ secret }).then(firstRecord).then(apiKeyFromRecord);
