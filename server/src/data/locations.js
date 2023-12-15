import { NotFoundError } from '../error';
import { curry, eq, firstRecord, throwIfNil } from '../util';

// const newRecordFromEvent = (event) => ({
//   title: event.title,
//   type_id: event.typeId,
//   date_value: event.dateValue,
//   location_id: event.locationId,
// });

// const eventFromRecord = (record) => ({
//   id: record.id,
//   title: record.title,
//   typeId: record.type_id,
//   dateValue: record.date_value,
//   locationId: record.location_id,
// });

// const eventsFromRecords = (records) => records.map(eventFromRecord);

// export const createEvent = curry((db, event) =>
//   db('events')
//     .insert(newRecordFromEvent(event))
//     .returning('*')
//     .then(firstRecord)
//     .then(eventFromRecord),
// );

// export const readAllEvents = thunk((db) =>
//   db('events').select('*').then(eventsFromRecords),
// );

// export const readEvent = curry((db, id) =>
//   db('events')
//     .where({ id })
//     .first()
//     .then(throwIfNil(() => NotFoundError(`Event id ${id}`)))
//     .then(eventFromRecord),
// );

export const locationExists = curry((db, id) =>
  db('locations')
    .where({ id })
    .count()
    .then(firstRecord)
    .then(prop('count'))
    .then(eq(1)),
);

// export const updateEvent = curry((db, id, fields) =>
//   db('events')
//     .where({ id })
//     .update(fields)
//     .returning('*')
//     .then(firstRecord)
//     .then(eventFromRecord),
// );
