import { readAllResources } from '../resource-repo';
import * as U from '../../util';

const fromModel = U.transform({
  id: U.prop('id'),
  given_names: U.prop('givenNames'),
  surname: U.prop('surname'),
  gender_id: U.prop('genderId'),
  gender_title: U.prop('genderTitle'),
  creator_id: U.prop('creatorId'),
  child_id: U.prop('childId'),
  parent_role_id: U.prop('parentRoleId'),
  parent_role_title: U.prop('parentRoleTitle'),
});

const toModel = U.transform({
  id: U.prop('id'),
  givenNames: U.prop('given_names'),
  surname: U.prop('surname'),
  genderId: U.prop('gender_id'),
  genderTitle: U.prop('gender_title'),
  creatorId: U.prop('creator_id'),
  childId: U.prop('child_id'),
  parentRoleId: U.prop('parent_role_id'),
  parentRoleTitle: U.prop('parent_role_title'),
});

export const createParentRepo = ({ parentStore }) => ({
  readAllParents: readAllResources(
    parentStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  // del: del(db, table),
});
