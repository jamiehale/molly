import { createResourceStore } from '../resource-store';

const locationFromRecord = (record) => ({
  id: record.id,
  value: record.value,
});

const recordFromLocation = (newLocation) => ({
  value: newLocation.value,
});

export const createLocationStore = (db) =>
  createResourceStore(db, 'locations', locationFromRecord, recordFromLocation);
