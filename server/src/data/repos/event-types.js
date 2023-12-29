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

export const createEventTypesRepo = ({ eventTypesStore }) => ({
  createEventType: createResource(eventTypesStore, fromModel, toModel),
  readEventType: readResource(eventTypesStore, toModel),
  readAllEventTypes: readAllResources(
    eventTypesStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  eventTypeExists: resourceExists(eventTypesStore),
  updateEventType: updateResource(eventTypesStore, fromModel, toModel),
  updateAllEventTypes: updateAllResources(eventTypesStore, fromModel, toModel),
  // del: del(db, table),
});
