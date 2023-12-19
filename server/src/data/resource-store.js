import { NotFoundError } from '../error';
import { curry, firstRecord, throwIfNil, toInt } from '../util';
import * as U from '../util';

const create = curry((db, table, fields) =>
  db(table).insert(fields).returning('*').then(firstRecord),
);

const readSingle = curry((db, table, specifier) =>
  db(table)
    .where(specifier)
    .first()
    .then(throwIfNil(() => NotFoundError('Not found'))),
);

const readAll = curry((db, table, filter) =>
  db(table).where(filter).select('*'),
);

const exists = curry((db, table, specifier) =>
  db(table)
    .where(specifier)
    .count()
    .then(firstRecord)
    .then(U.prop('count'))
    .then(toInt)
    .then(U.eq(1)),
);

const updateSingle = curry((db, table, specifier, fields) =>
  db(table).where(specifier).update(fields).returning('*').then(firstRecord),
);

const updateAll = curry((db, table, filter, fields) =>
  db(table).where(filter).update(fields).returning('*').then(firstRecord),
);

export const createResourceStore = (db, table) => ({
  create: create(db, table),
  readSingle: readSingle(db, table),
  readAll: readAll(db, table),
  exists: exists(db, table),
  updateSingle: updateSingle(db, table),
  updateAll: updateAll(db, table),
  // del: del(db, table),
});
