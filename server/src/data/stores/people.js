import { createResourceStore } from '../resource-store';
import * as U from '../../util';

const queryPeople = U.curry((db, q) =>
  db('people')
    .whereILike('given_names', `%${q}%`)
    .orWhereILike('surname', `%${q}%`)
    .select('*'),
);

export const createPersonStore = (db) => ({
  ...createResourceStore(db, 'people'),
  queryPeople: queryPeople(db),
});
