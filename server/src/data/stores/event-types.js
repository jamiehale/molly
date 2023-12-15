import { createResourceStore } from '../resource-store';

const eventTypeFromRecord = (record) => ({
  id: record.id,
  title: record.title,
});

export const createEventTypeStore = (db) =>
  createResourceStore(db, 'event_types', eventTypeFromRecord, {});
