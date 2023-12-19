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
  title: U.prop('title'),
  type_id: U.prop('typeId'),
  date_value: U.prop('dateValue'),
  location_id: U.prop('locationId'),
});

const toModel = U.transform({
  id: U.prop('id'),
  title: U.prop('title'),
  typeId: U.prop('type_id'),
  dateValue: U.prop('date_value'),
  locationId: U.prop('location_id'),
});

export const createEventRepo = ({ eventStore }) => ({
  createEvent: createResource(eventStore, fromModel, toModel),
  readEvent: readResource(eventStore, toModel),
  readAllEvents: readAllResources(eventStore, fromModel, toModel),
  eventExists: resourceExists(eventStore),
  updateEvent: updateResource(eventStore, fromModel, toModel),
  updateAllEvents: updateAllResources(eventStore, fromModel, toModel),
  // del: del(db, table),
});
