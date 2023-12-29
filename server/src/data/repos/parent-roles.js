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

export const createParentRoleRepo = ({ parentRoleStore }) => ({
  createParentRole: createResource(parentRoleStore, fromModel, toModel),
  readParentRole: readResource(parentRoleStore, toModel),
  readAllParentRoles: readAllResources(
    parentRoleStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  parentRoleExists: resourceExists(parentRoleStore),
  updateParentRole: updateResource(parentRoleStore, fromModel, toModel),
  updateAllParentRoles: updateAllResources(parentRoleStore, fromModel, toModel),
  // del: del(db, table),
});
