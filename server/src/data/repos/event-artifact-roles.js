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

export const createEventArtifactRolesRepo = ({ eventArtifactRolesStore }) => ({
  createEventArtifactRole: createResource(
    eventArtifactRolesStore,
    fromModel,
    toModel,
  ),
  readEventArtifactRole: readResource(eventArtifactRolesStore, toModel),
  readAllEventArtifactRoles: readAllResources(
    eventArtifactRolesStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  eventArtifactRoleExists: resourceExists(eventArtifactRolesStore),
  updateEventArtifactRole: updateResource(
    eventArtifactRolesStore,
    fromModel,
    toModel,
  ),
  updateAllEventArtifactRoles: updateAllResources(
    eventArtifactRolesStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
