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
});

const toModel = U.transform({
  id: U.prop('id'),
});

export const createUserRepo = ({ userStore }) => ({
  createUser: createResource(userStore, fromModel, toModel),
  readUser: readResource(userStore, toModel),
  readAllUsers: readAllResources(userStore, fromModel, toModel),
  userExists: resourceExists(userStore),
  updateUser: updateResource(userStore, fromModel, toModel),
  updateAllUsers: updateAllResources(userStore, fromModel, toModel),
  // del: del(db, table),
});
