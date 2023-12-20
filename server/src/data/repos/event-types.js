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
});

const toModel = U.transform({
  id: U.prop('id'),
  title: U.prop('title'),
});

export const createEventTypeRepo = ({ eventTypeStore }) => ({
  createEventType: createResource(eventTypeStore, fromModel, toModel),
  readEventType: readResource(eventTypeStore, toModel),
  readAllEventTypes: readAllResources(
    eventTypeStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  eventTypeExists: resourceExists(eventTypeStore),
  updateEventType: updateResource(eventTypeStore, fromModel, toModel),
  updateAllEventTypes: updateAllResources(eventTypeStore, fromModel, toModel),
  // del: del(db, table),
});
