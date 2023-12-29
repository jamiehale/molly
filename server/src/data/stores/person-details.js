import { createResourceStore } from '../resource-store';
import * as J from '../../jlib';

const queryPeople = J.curry((db, q) =>
  db('people')
    .whereILike('given_names', `%${q}%`)
    .orWhereILike('surname', `%${q}%`)
    .select('*'),
);

export const createPersonDetailsStore = (db) => ({
  ...createResourceStore(db, 'person_details'),
  queryPeople: queryPeople(db),
});
