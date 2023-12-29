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
});

const toModel = J.transform({
  id: J.prop('id'),
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
