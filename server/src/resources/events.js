import {
  routes,
  getSingleResource,
  getAllResources,
  postResource,
  patchResource,
  getAllChildResources,
  postChildResource,
} from '../resource-helpers';
import * as V from '../validation';
import * as J from '../jlib';
import { ParameterError } from '../error';

const postBody = (validEventTypeFn, validLocationFn) =>
  V.object({
    title: V.and(V.required(), V.isNotNull()),
    typeId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validEventTypeFn),
    ),
    dateValue: V.optional(V.and(V.isNotNull(), V.validDateValue())),
    locationId: V.optional(
      V.and(V.isNotNull(), V.validResource(validLocationFn)),
    ),
  });

const patchBody = (validEventTypeFn, validLocationFn) =>
  V.and(
    V.object({
      title: V.optional(V.isNotNull()),
      typeId: V.optional(V.isNotNull(), V.validResource(validEventTypeFn)),
      dateValue: V.optional(V.isNotNull(), V.validDateValue()),
      locationId: V.optional(
        V.and(V.isNotNull(), V.validResource(validLocationFn)),
      ),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const toResult = J.pick(['id', 'title', 'typeId', 'dateValue', 'locationId']);

const toDetailsResult = J.pick([
  'id',
  'title',
  'typeId',
  'typeTitle',
  'dateValue',
  'locationId',
  'locationValue',
]);

const toEventPersonResult = J.pick([
  'eventId',
  'roleId',
  'roleTitle',
  'id',
  'givenNames',
  'surname',
  'genderId',
  'genderTitle',
  'creatorId',
]);

const toEventArtifactResult = J.pick([
  'eventId',
  'roleId',
  'roleTitle',
  'id',
  'title',
  'description',
  'typeId',
  'typeTitle',
  'sourceId',
  'sourceTitle',
  'collectionId',
  'collectionTitle',
  'creatorId',
]);

const postEventPersonBody = (validPersonFn, validEventPersonRoleFn) =>
  V.object({
    personId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validPersonFn),
    ),
    roleId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validEventPersonRoleFn),
    ),
  });

const postEventArtifactBody = (validArtifactFn) =>
  V.object({
    artifactId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validArtifactFn),
    ),
  });

export const eventRoutes = ({
  artifactsRepo,
  eventsRepo,
  eventArtifactsRepo,
  eventPersonRolesRepo,
  eventPeopleRepo,
  eventTypesRepo,
  peopleRepo,
  locationsRepo,
}) =>
  routes([
    getAllChildResources(
      '/events/:id/artifacts',
      eventsRepo.eventExists,
      ({ params }) =>
        eventArtifactsRepo
          .readAllEventArtifacts(params.id)
          .then(J.map(toEventArtifactResult)),
    ),
    getSingleResource('/events/:id', eventsRepo.eventExists, ({ params }) =>
      eventsRepo.readEvent(params.id).then(toDetailsResult),
    ),
    getAllResources('/events', V.any(), () =>
      eventsRepo.readAllEvents().then(J.map(toDetailsResult)),
    ),
    postResource(
      '/events',
      postBody(eventTypesRepo.eventTypeExists, locationsRepo.locationExists),
      ({ userId, body }) =>
        eventsRepo
          .createEvent(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['title', 'typeId', 'dateValue', 'locationId']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/events/:id',
      eventsRepo.eventExists,
      patchBody(eventTypesRepo.eventTypeExists, locationsRepo.locationExists),
      ({ params, body }) =>
        eventsRepo
          .updateEvent(
            params.id,
            J.compose(
              J.filterEmptyProps,
              J.pick(['title', 'typeId', 'dateValue', 'locationId']),
            )(body),
          )
          .then(toResult),
    ),
    getAllChildResources(
      '/events/:id/people',
      eventsRepo.eventExists,
      ({ params }) =>
        eventPeopleRepo
          .readAllEventPeople(params.id)
          .then(J.map(toEventPersonResult)),
    ),
    postChildResource(
      '/events/:id/people',
      eventsRepo.eventExists,
      postEventPersonBody(
        peopleRepo.personExists,
        eventPersonRolesRepo.eventPersonRoleExists,
      ),
      ({ params, body }) =>
        eventPeopleRepo
          .createEventPerson(
            J.compose(
              J.filterEmptyProps,
              J.assoc('eventId', params.id),
              J.pick(['personId', 'roleId']),
            )(body),
          )
          .then(toEventPersonResult),
    ),
    postChildResource(
      '/events/:id/artifacts',
      eventsRepo.eventExists,
      postEventArtifactBody(artifactsRepo.artifactExists),
      ({ params, body }) =>
        eventArtifactsRepo
          .createEventArtifact(
            J.compose(
              J.filterEmptyProps,
              J.assoc('eventId', params.id),
              J.pick(['artifactId']),
            )(body),
          )
          .then(toEventArtifactResult),
    ),
  ]);
