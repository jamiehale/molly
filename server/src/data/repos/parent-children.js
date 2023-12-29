import { createResource, readAllResources } from '../resource-repo';
import * as J from '../../jlib';

const fromModel = J.transform({
  parent_id: J.prop('parentId'),
  child_id: J.prop('childId'),
  parent_role_id: J.prop('parentRoleId'),
});

const toModel = J.transform({
  parentId: J.prop('parent_id'),
  childId: J.prop('child_id'),
  parentRoleId: J.prop('parent_role_id'),
});

export const createParentChildRepo = ({ parentChildStore }) => ({
  createParentChild: createResource(parentChildStore, fromModel, toModel),
  // del: del(db, table),
});
