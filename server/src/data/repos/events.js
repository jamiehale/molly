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
  title: J.prop('title'),
  type_id: J.prop('typeId'),
  date_value: J.prop('dateValue'),
  location_id: J.prop('locationId'),
});

const toModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
  typeId: J.prop('type_id'),
  dateValue: J.prop('date_value'),
  locationId: J.prop('location_id'),
});

export const createEventRepo = ({ eventStore }) => ({
  createEvent: createResource(eventStore, fromModel, toModel),
  readEvent: readResource(eventStore, toModel),
  readAllEvents: readAllResources(
    eventStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  eventExists: resourceExists(eventStore),
  updateEvent: updateResource(eventStore, fromModel, toModel),
  updateAllEvents: updateAllResources(eventStore, fromModel, toModel),
  // del: del(db, table),
});
