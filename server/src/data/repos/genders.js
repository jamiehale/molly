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

export const createGendersRepo = ({ gendersStore }) => ({
  createGender: createResource(gendersStore, fromModel, toModel),
  readGender: readResource(gendersStore, toModel),
  readAllGenders: readAllResources(
    gendersStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  genderExists: resourceExists(gendersStore),
  updateGender: updateResource(gendersStore, fromModel, toModel),
  updateAllGenders: updateAllResources(gendersStore, fromModel, toModel),
  // del: del(db, table),
});
