import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as U from '../../util';

const fromModel = U.transform({
  id: U.prop('id'),
  value: U.prop('value'),
});

const toModel = U.transform({
  id: U.prop('id'),
  value: U.prop('value'),
});

export const createLocationRepo = ({ locationStore }) => ({
  createLocation: createResource(locationStore, fromModel, toModel),
  readLocation: readResource(locationStore, toModel),
  readAllLocations: readAllResources(
    locationStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  locationExists: resourceExists(locationStore),
  updateLocation: updateResource(locationStore, fromModel, toModel),
  updateAllLocations: updateAllResources(locationStore, fromModel, toModel),
  // del: del(db, table),
});
