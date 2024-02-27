import { NotFoundError, isMollyError, toInternalError } from '../error.js';
import * as J from '../jlib.js';

const readSingle = J.curry((db, table, specifier) =>
  db(table)
    .where(specifier)
    .first()
    .then(J.throwIfNil(() => new NotFoundError('Not found')))
    .catch((e) => {
      if (isMollyError(e)) {
        throw e;
      }
      throw toInternalError(e);
    }),
);

const readAll = J.curry((db, table, filter) => db(table).where(filter).select('*').catch(toInternalError));

const exists = J.curry((db, table, specifier) =>
  db(table)
    .where(specifier)
    .count()
    .then(J.first)
    .then(J.prop('count'))
    .then(J.toInt)
    .then(J.eq(1))
    .catch(toInternalError),
);

export const createViewStore = (db, table) => ({
  readSingle: readSingle(db, table),
  readAll: readAll(db, table),
  exists: exists(db, table),
});
