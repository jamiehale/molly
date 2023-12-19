import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const eventTypeFromRecord = (record) => ({
  id: record.id,
  title: record.title,
});

const eventTypeKeyMap = {
  id: 'id',
  title: 'title',
};

export const createEventTypeStore = (db) =>
  createResourceStore(
    db,
    'event_types',
    eventTypeFromRecord,
    renameKeys(eventTypeKeyMap),
  );
