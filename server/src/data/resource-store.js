import { NotFoundError } from '../error';
import * as J from '../jlib';

const create = J.curry((db, table, fields) =>
  db(table).insert(fields).returning('*').then(J.first),
);

const readSingle = J.curry((db, table, specifier) =>
  db(table)
    .where(specifier)
    .first()
    .then(J.throwIfNil(() => NotFoundError('Not found'))),
);

const readAll = J.curry((db, table, filter) =>
  db(table).where(filter).select('*'),
);

const exists = J.curry((db, table, specifier) =>
  db(table)
    .where(specifier)
    .count()
    .then(J.first)
    .then(J.prop('count'))
    .then(J.toInt)
    .then(J.eq(1)),
);

const updateSingle = J.curry((db, table, specifier, fields) =>
  db(table).where(specifier).update(fields).returning('*').then(J.first),
);

const updateAll = J.curry((db, table, filter, fields) =>
  db(table).where(filter).update(fields).returning('*').then(J.first),
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
