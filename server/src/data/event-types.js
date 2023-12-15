import { curry, eq, prop } from '../util';

const eventTypeFromRecord = (record) => ({
  id: record.id,
  title: record.title,
});

const eventTypesFromRecords = (records) => records.map(eventTypeFromRecord);

export const readAllEventTypes = (db) =>
  db('event_types').select('*').then(eventTypesFromRecords);

export const readEventType = (db, id) =>
  db('event_types').where({ id }).first().then(eventTypeFromRecord);

export const eventTypeExists = curry((db, id) =>
  db('event_types')
    .where({ id })
    .count()
    .then(firstRecord)
    .then(prop('count'))
    .then(eq(1)),
);
