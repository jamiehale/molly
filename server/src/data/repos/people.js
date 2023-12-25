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
  given_names: U.prop('givenNames'),
  surname: U.prop('surname'),
  gender_id: U.prop('genderId'),
  creator_id: U.prop('creatorId'),
});

const toModel = U.transform({
  id: U.prop('id'),
  givenNames: U.prop('given_names'),
  surname: U.prop('surname'),
  genderId: U.prop('gender_id'),
  creatorId: U.prop('creator_id'),
});

export const createPersonRepo = ({ personStore }) => ({
  createPerson: createResource(personStore, fromModel, toModel),
  readPerson: readResource(personStore, toModel),
  readAllPeople: readAllResources(
    personStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  personExists: resourceExists(personStore),
  updatePerson: updateResource(personStore, fromModel, toModel),
  updateAllPeople: updateAllResources(personStore, fromModel, toModel),
  // del: del(db, table),
});
