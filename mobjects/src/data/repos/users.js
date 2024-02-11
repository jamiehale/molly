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

export const createUsersRepo = ({ usersStore }) => ({
  createUser: createResource(usersStore, fromModel, toModel),
  readUser: readResource(usersStore, toModel),
  readAllUsers: readAllResources(usersStore, fromModel, toModel),
  userExists: resourceExists(usersStore),
  updateUser: updateResource(usersStore, fromModel, toModel),
  updateAllUsers: updateAllResources(usersStore, fromModel, toModel),
  // del: del(db, table),
});
