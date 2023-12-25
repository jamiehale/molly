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

export const createGenderRepo = ({ genderStore }) => ({
  createGender: createResource(genderStore, fromModel, toModel),
  readGender: readResource(genderStore, toModel),
  readAllGenders: readAllResources(
    genderStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  genderExists: resourceExists(genderStore),
  updateGender: updateResource(genderStore, fromModel, toModel),
  updateAllGenders: updateAllResources(genderStore, fromModel, toModel),
  // del: del(db, table),
});
