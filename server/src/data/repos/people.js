import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as J from '../../jlib';
import { toInternalError } from '../../error';

const fromModel = J.transform({
  id: J.prop('id'),
  given_names: J.prop('givenNames'),
  surname: J.prop('surname'),
  gender_id: J.prop('genderId'),
  creator_id: J.prop('creatorId'),
});

const toModel = J.transform({
  id: J.prop('id'),
  givenNames: J.prop('given_names'),
  surname: J.prop('surname'),
  genderId: J.prop('gender_id'),
  creatorId: J.prop('creator_id'),
});

const toDetailsModel = J.transform({
  id: J.prop('id'),
  givenNames: J.prop('given_names'),
  surname: J.prop('surname'),
  genderId: J.prop('gender_id'),
  genderTitle: J.prop('gender_title'),
  creatorId: J.prop('creator_id'),
});

const queryPeople = (store, toModelFn) => (q) =>
  store.queryPeople(q).then(J.map(toModelFn)).catch(toInternalError);

export const createPeopleRepo = ({ peopleStore, personDetailsStore }) => ({
  createPerson: createResource(peopleStore, fromModel, toModel),
  readPerson: readResource(personDetailsStore, toDetailsModel),
  readAllPeople: readAllResources(
    personDetailsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toDetailsModel,
  ),
  queryPeople: queryPeople(personDetailsStore, toDetailsModel),
  personExists: resourceExists(peopleStore),
  updatePerson: updateResource(peopleStore, fromModel, toModel),
  updateAllPeople: updateAllResources(peopleStore, fromModel, toModel),
  // del: del(db, table),
});
