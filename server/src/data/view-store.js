import { NotFoundError } from '../error';
import * as J from '../jlib';

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

export const createViewStore = (db, table) => ({
  readSingle: readSingle(db, table),
  readAll: readAll(db, table),
  exists: exists(db, table),
});
