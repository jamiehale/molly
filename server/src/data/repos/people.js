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

const queryPeople = (store, toModelFn) => (q) =>
  store.queryPeople(q).then(J.map(toModelFn)).catch(toInternalError);

export const createPersonRepo = ({ personStore }) => ({
  createPerson: createResource(personStore, fromModel, toModel),
  readPerson: readResource(personStore, toModel),
  readAllPeople: readAllResources(
    personStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  queryPeople: queryPeople(personStore, toModel),
  personExists: resourceExists(personStore),
  updatePerson: updateResource(personStore, fromModel, toModel),
  updateAllPeople: updateAllResources(personStore, fromModel, toModel),
  // del: del(db, table),
});
