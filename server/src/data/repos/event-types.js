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
});

const toModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
});

export const createEventTypeRepo = ({ eventTypeStore }) => ({
  createEventType: createResource(eventTypeStore, fromModel, toModel),
  readEventType: readResource(eventTypeStore, toModel),
  readAllEventTypes: readAllResources(
    eventTypeStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  eventTypeExists: resourceExists(eventTypeStore),
  updateEventType: updateResource(eventTypeStore, fromModel, toModel),
  updateAllEventTypes: updateAllResources(eventTypeStore, fromModel, toModel),
  // del: del(db, table),
});
