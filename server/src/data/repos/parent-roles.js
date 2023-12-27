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

export const createParentRoleRepo = ({ parentRoleStore }) => ({
  createParentRole: createResource(parentRoleStore, fromModel, toModel),
  readParentRole: readResource(parentRoleStore, toModel),
  readAllParentRoles: readAllResources(
    parentRoleStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  parentRoleExists: resourceExists(parentRoleStore),
  updateParentRole: updateResource(parentRoleStore, fromModel, toModel),
  updateAllParentRoles: updateAllResources(parentRoleStore, fromModel, toModel),
  // del: del(db, table),
});
