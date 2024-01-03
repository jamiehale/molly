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

const fromDetailsModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
  type_id: J.prop('typeId'),
  type_title: J.prop('typeTitle'),
  date_value: J.prop('dateValue'),
  location_id: J.prop('locationId'),
  location_value: J.prop('locationValue'),
});

const toDetailsModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
  typeId: J.prop('type_id'),
  typeTitle: J.prop('type_title'),
  dateValue: J.prop('date_value'),
  locationId: J.prop('location_id'),
  locationValue: J.prop('location_value'),
});

export const createEventsRepo = ({ eventsStore, eventDetailsStore }) => ({
  createEvent: createResource(eventsStore, fromModel, toModel),
  readEvent: readResource(eventDetailsStore, toDetailsModel),
  readAllEvents: readAllResources(
    eventDetailsStore,
    J.compose(J.filterEmptyProps, fromDetailsModel),
    toDetailsModel,
  ),
  eventExists: resourceExists(eventsStore),
  updateEvent: updateResource(eventsStore, fromModel, toModel),
  updateAllEvents: updateAllResources(eventsStore, fromModel, toModel),
  // del: del(db, table),
});
