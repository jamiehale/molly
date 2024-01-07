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

export const createEventPersonRolesRepo = ({ eventPersonRolesStore }) => ({
  createEventPersonRole: createResource(
    eventPersonRolesStore,
    fromModel,
    toModel,
  ),
  readEventPersonRole: readResource(eventPersonRolesStore, toModel),
  readAllEventPersonRoles: readAllResources(
    eventPersonRolesStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  eventPersonRoleExists: resourceExists(eventPersonRolesStore),
  updateEventPersonRole: updateResource(
    eventPersonRolesStore,
    fromModel,
    toModel,
  ),
  updateAllEventPersonRoles: updateAllResources(
    eventPersonRolesStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
