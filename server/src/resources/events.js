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

export const eventRoutes = ({ eventRepo, eventTypeRepo, locationRepo }) =>
  routes([
    getSingleResource('/events/:id', eventRepo.eventExists, ({ params }) =>
      eventRepo.readEvent(params.id).then(toResult),
    ),
    getAllResources('/events', V.any(), () =>
      eventRepo.readAllEvents().then(J.map(toResult)),
    ),
    postResource(
      '/events',
      postBody(eventTypeRepo.eventTypeExists, locationRepo.locationExists),
      ({ userId, body }) =>
        eventRepo
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
      eventRepo.eventExists,
      patchBody(eventTypeRepo.eventTypeExists, locationRepo.locationExists),
      ({ params, body }) =>
        eventRepo
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
