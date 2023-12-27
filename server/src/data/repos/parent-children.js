import { createResource, readAllResources } from '../resource-repo';
import * as U from '../../util';

const fromModel = U.transform({
  parent_id: U.prop('parentId'),
  child_id: U.prop('childId'),
  parent_role_id: U.prop('parentRoleId'),
});

const toModel = U.transform({
  parentId: U.prop('parent_id'),
  childId: U.prop('child_id'),
  parentRoleId: U.prop('parent_role_id'),
});

export const createParentChildRepo = ({ parentChildStore }) => ({
  createParentChild: createResource(parentChildStore, fromModel, toModel),
  // del: del(db, table),
});
