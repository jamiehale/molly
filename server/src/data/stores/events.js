import { createResourceStore } from '../resource-store';

const recordFromEvent = (newEvent) => ({
  title: newEvent.title,
  type_id: newEvent.typeId,
  date_value: newEvent.dateValue,
  location_id: newEvent.locationId,
});

const eventFromRecord = (record) => ({
  id: record.id,
  title: record.title,
  typeId: record.type_id,
  dateValue: record.date_value,
  locationId: record.location_id,
});

export const createEventStore = (db) =>
  createResourceStore(db, 'events', eventFromRecord, recordFromEvent);
