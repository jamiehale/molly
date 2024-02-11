import { NotFoundError, isMollyError, toInternalError } from '../error.js';
import * as J from '../jlib.js';

const create = J.curry((db, table, fields) =>
  db(table).insert(fields).returning('*').then(J.first).catch(toInternalError),
);

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

const readAll = J.curry((db, table, filter) =>
  db(table).where(filter).select('*').catch(toInternalError),
);

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

const updateSingle = J.curry((db, table, hasTimestamps, specifier, fields) =>
  db(table)
    .where(specifier)
    .update({
      ...fields,
      ...(hasTimestamps ? { updated_at: db.fn.now() } : {}),
    })
    .returning('*')
    .then(J.first)
    .catch(toInternalError),
);

const updateAll = J.curry((db, table, hasTimestamps, filter, fields) =>
  db(table)
    .where(filter)
    .update({
      ...fields,
      ...(hasTimestamps ? { updated_at: db.fn.now() } : {}),
    })
    .returning('*')
    .then(J.first)
    .catch(toInternalError),
);

const deleteSingle = J.curry((db, table, specifier) =>
  db(table).where(specifier).delete().catch(toInternalError),
);

export const createResourceStore = (db, table, hasTimestamps = false) => ({
  create: create(db, table),
  readSingle: readSingle(db, table),
  readAll: readAll(db, table),
  exists: exists(db, table),
  updateSingle: updateSingle(db, table, hasTimestamps),
  updateAll: updateAll(db, table, hasTimestamps),
  deleteSingle: deleteSingle(db, table),
});
