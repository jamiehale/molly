import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as J from '../../jlib';

const fromModel = J.transform({
  id: J.prop('id'),
  value: J.prop('value'),
});

const toModel = J.transform({
  id: J.prop('id'),
  value: J.prop('value'),
});

export const createLocationRepo = ({ locationStore }) => ({
  createLocation: createResource(locationStore, fromModel, toModel),
  readLocation: readResource(locationStore, toModel),
  readAllLocations: readAllResources(
    locationStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  locationExists: resourceExists(locationStore),
  updateLocation: updateResource(locationStore, fromModel, toModel),
  updateAllLocations: updateAllResources(locationStore, fromModel, toModel),
  // del: del(db, table),
});
