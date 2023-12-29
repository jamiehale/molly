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

export const createParentRolesRepo = ({ parentRolesStore }) => ({
  createParentRole: createResource(parentRolesStore, fromModel, toModel),
  readParentRole: readResource(parentRolesStore, toModel),
  readAllParentRoles: readAllResources(
    parentRolesStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  parentRoleExists: resourceExists(parentRolesStore),
  updateParentRole: updateResource(parentRolesStore, fromModel, toModel),
  updateAllParentRoles: updateAllResources(
    parentRolesStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
