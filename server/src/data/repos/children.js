import { readAllResources } from '../resource-repo';
import * as U from '../../util';

const fromModel = U.transform({
  id: U.prop('id'),
  given_names: U.prop('givenNames'),
  surname: U.prop('surname'),
  gender_id: U.prop('genderId'),
  gender_title: U.prop('genderTitle'),
  creator_id: U.prop('creatorId'),
  parent_id: U.prop('parentId'),
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
  parentId: U.prop('parent_id'),
  parentRoleId: U.prop('parent_role_id'),
  parentRoleTitle: U.prop('parent_role_title'),
});

export const createChildRepo = ({ childStore }) => ({
  readAllChildren: readAllResources(
    childStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  // del: del(db, table),
});
