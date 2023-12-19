import { renameKeys } from '../../util';
import { createResourceStore } from '../resource-store';

const locationKeyMap = {
  id: 'id',
  value: 'value',
};

const recordFromLocation = (newLocation) => ({
  value: newLocation.value,
});

export const createLocationStore = (db) =>
  createResourceStore(
    db,
    'locations',
    locationKeyMap,
    renameKeys(locationKeyMap),
  );
