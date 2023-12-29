import { readAllResources } from '../resource-repo';
import * as J from '../../jlib';

const fromModel = J.transform({
  id: J.prop('id'),
  given_names: J.prop('givenNames'),
  surname: J.prop('surname'),
  gender_id: J.prop('genderId'),
  gender_title: J.prop('genderTitle'),
  creator_id: J.prop('creatorId'),
  child_id: J.prop('childId'),
  parent_role_id: J.prop('parentRoleId'),
  parent_role_title: J.prop('parentRoleTitle'),
});

const toModel = J.transform({
  id: J.prop('id'),
  givenNames: J.prop('given_names'),
  surname: J.prop('surname'),
  genderId: J.prop('gender_id'),
  genderTitle: J.prop('gender_title'),
  creatorId: J.prop('creator_id'),
  childId: J.prop('child_id'),
  parentRoleId: J.prop('parent_role_id'),
  parentRoleTitle: J.prop('parent_role_title'),
});

export const createParentRepo = ({ parentStore }) => ({
  readAllParents: readAllResources(
    parentStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  // del: del(db, table),
});
