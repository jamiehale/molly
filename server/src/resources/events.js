import {
  routes,
  getSingleResource,
  getAllResources,
  postResource,
  patchResource,
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

export const eventRoutes = ({ eventsRepo, eventTypesRepo, locationsRepo }) =>
  routes([
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
  ]);
