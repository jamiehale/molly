import { ParameterError } from '../error';
import {
  routes,
  getSingleResource,
  getAllResources,
  patchResource,
  postResource,
} from '../resource-helpers';
import * as U from '../util';
import * as V from '../validation';

const postBody = (validEventTypeFn) =>
  V.object({
    id: V.and(V.required(), V.isNotNull(), V.availableKey(validEventTypeFn)),
    title: V.and(V.required(), V.isNotNull()),
  });

const patchBody = () =>
  V.and(
    V.object({
      title: V.optional(V.isNotNull()),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const toResult = U.pick(['id', 'title']);

export const eventTypeRoutes = ({ eventTypeRepo }) =>
  routes([
    getSingleResource(
      '/event-types/:id',
      eventTypeRepo.eventTypeExists,
      ({ params }) => eventTypeRepo.readEventType(params.id).then(toResult),
    ),
    getAllResources('/event-types', V.any(), () =>
      eventTypeRepo.readAllEventTypes().then(U.map(toResult)),
    ),
    postResource(
      '/event-types',
      postBody((id) => eventTypeRepo.eventTypeExists(id).then(U.not)),
      ({ userId, body }) =>
        eventTypeRepo
          .createEventType(
            U.compose(
              U.assoc('creatorId', userId),
              U.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/event-types/:id',
      eventTypeRepo.eventTypeExists,
      patchBody(),
      ({ params, body }) =>
        eventTypeRepo
          .updateEventType(
            params.id,
            U.compose(U.filterEmptyProps, U.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
