import { NotFoundError } from '../error';
import { firstRecord, throwIfNil } from '../util';

const newRecordFromEvent = (event) => ({
  title: event.title,
  type_id: event.typeId,
  date_value: event.dateValue,
  location_id: event.locationId,
});

const eventFromRecord = (record) => ({
  id: record.id,
  title: record.title,
  typeId: record.type_id,
  dateValue: record.date_value,
  locationId: record.location_id,
});

const eventsFromRecords = (records) => records.map(eventFromRecord);

export const createEvent = (db, event) =>
  db('events')
    .insert(newRecordFromEvent(event))
    .returning('*')
    .then(firstRecord)
    .then(eventFromRecord);

export const readAllEvents = (db) =>
  db('events').select('*').then(eventsFromRecords);

export const readevent = (db, id) =>
  db('events')
    .where({ id })
    .first()
    .then(throwIfNil(() => NotFoundError(`Event id ${id}`)))
    .then(eventFromRecord);

export const updateEvent = (db, id, fields) =>
  db('events')
    .where({ id })
    .update(fields)
    .returning('*')
    .then(firstRecord)
    .then(eventFromRecord);
