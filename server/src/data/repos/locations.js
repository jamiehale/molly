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

export const createLocationsRepo = ({ locationsStore }) => ({
  createLocation: createResource(locationsStore, fromModel, toModel),
  readLocation: readResource(locationsStore, toModel),
  readAllLocations: readAllResources(
    locationsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  locationExists: resourceExists(locationsStore),
  updateLocation: updateResource(locationsStore, fromModel, toModel),
  updateAllLocations: updateAllResources(locationsStore, fromModel, toModel),
  // del: del(db, table),
});
