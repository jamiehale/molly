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

export const createGenderRepo = ({ genderStore }) => ({
  createGender: createResource(genderStore, fromModel, toModel),
  readGender: readResource(genderStore, toModel),
  readAllGenders: readAllResources(
    genderStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  genderExists: resourceExists(genderStore),
  updateGender: updateResource(genderStore, fromModel, toModel),
  updateAllGenders: updateAllResources(genderStore, fromModel, toModel),
  // del: del(db, table),
});
