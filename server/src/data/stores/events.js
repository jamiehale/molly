import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const eventKeyMap = {
  id: 'id',
  title: 'title',
  typeId: 'type_id',
  dateValue: 'date_value',
  locationId: 'location_id',
};

const eventFromRecord = (record) => ({
  id: record.id,
  title: record.title,
  typeId: record.type_id,
  dateValue: record.date_value,
  locationId: record.location_id,
});

export const createEventStore = (db) =>
  createResourceStore(db, 'events', eventFromRecord, renameKeys(eventKeyMap));
