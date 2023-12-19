import { NotFoundError } from '../error';
import { curry, eq, firstRecord, prop, throwIfNil, toInt } from '../util';

const objectsFromRecords = curry((objectFromRecord, records) =>
  records.map(objectFromRecord),
);

const create = curry((db, table, objectFromRecord, recordFromObject, fields) =>
  db(table)
    .insert(recordFromObject(fields))
    .returning('*')
    .then(firstRecord)
    .then(objectFromRecord),
);

const readSingle = curry(
  (db, table, objectFromRecord, recordFromObject, specifier) =>
    db(table)
      .where(recordFromObject(specifier))
      .first()
      .then(throwIfNil(() => NotFoundError(`Event id ${id}`)))
      .then(objectFromRecord),
);

const readAll = curry((db, table, objectFromRecord, recordFromObject, filter) =>
  db(table)
    .where(recordFromObject(filter))
    .select('*')
    .then(objectsFromRecords(objectFromRecord)),
);

const exists = curry((db, table, recordFromObject, specifier) =>
  db(table)
    .where(recordFromObject(specifier))
    .count()
    .then(firstRecord)
    .then(prop('count'))
    .then(toInt)
    .then(eq(1)),
);

const updateSingle = curry(
  (db, table, objectFromRecord, recordFromObject, specifier, fields) =>
    db(table)
      .where(recordFromObject(specifier))
      .update(recordFromObject(fields))
      .returning('*')
      .then(firstRecord)
      .then(objectFromRecord),
);

const updateAll = curry(
  (db, table, objectFromRecord, recordFromObject, filter, fields) =>
    db(table)
      .where(filter)
      .update(recordFromObject(fields))
      .returning('*')
      .then(firstRecord)
      .then(objectsFromRecords(objectFromRecord)),
);

export const createResourceStore = (
  db,
  table,
  objectFromRecord,
  recordFromObject,
) => ({
  create: create(db, table, objectFromRecord, recordFromObject),
  readSingle: readSingle(db, table, objectFromRecord, recordFromObject),
  readAll: readAll(db, table, objectFromRecord, recordFromObject),
  exists: exists(db, table, recordFromObject),
  updateSingle: updateSingle(db, table, objectFromRecord, recordFromObject),
  updateAll: updateAll(db, table, objectFromRecord, recordFromObject),
  // del: del(db, table),
});
