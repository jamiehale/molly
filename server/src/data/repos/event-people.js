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
  event_id: J.prop('eventId'),
  person_id: J.prop('personId'),
  role_id: J.prop('roleId'),
});

const toModel = J.transform({
  eventId: J.prop('event_id'),
  personId: J.prop('person_id'),
  roleId: J.prop('role_id'),
});

const toDetailsModel = J.transform({
  eventId: J.prop('event_id'),
  roleId: J.prop('role_id'),
  roleTitle: J.prop('role_title'),
  id: J.prop('id'),
  givenNames: J.prop('given_names'),
  surname: J.prop('surname'),
  genderId: J.prop('gender_id'),
  genderTitle: J.prop('gender_title'),
  creatorId: J.prop('creator_id'),
});

const queryPeople = (store, toModelFn) => (q) =>
  store.queryPeople(q).then(J.map(toModelFn)).catch(toInternalError);

export const createEventPeopleRepo = ({
  eventPeopleStore,
  eventPersonDetailsStore,
}) => ({
  createEventPerson: createResource(eventPeopleStore, fromModel, toModel),
  readEventPerson: readResource(eventPersonDetailsStore, toDetailsModel),
  readAllEventPeople: readAllResources(
    eventPersonDetailsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toDetailsModel,
  ),
  queryEventPeople: queryPeople(eventPersonDetailsStore, toDetailsModel),
  eventPersonExists: resourceExists(eventPeopleStore),
  updateEventPerson: updateResource(eventPeopleStore, fromModel, toModel),
  updateAllEventPeople: updateAllResources(
    eventPeopleStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
