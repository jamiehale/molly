import { ParameterError } from '../error';
import {
  routes,
  getSingleResource,
  getAllResources,
  patchResource,
  postResource,
} from '../resource-helpers';
import * as J from '../jlib';
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

const toResult = J.pick(['id', 'title']);

export const eventTypeRoutes = ({ eventTypesRepo }) =>
  routes([
    getSingleResource(
      '/event-types/:id',
      eventTypesRepo.eventTypeExists,
      ({ params }) => eventTypesRepo.readEventType(params.id).then(toResult),
    ),
    getAllResources('/event-types', V.any(), () =>
      eventTypesRepo.readAllEventTypes().then(J.map(toResult)),
    ),
    postResource(
      '/event-types',
      postBody((id) => eventTypesRepo.eventTypeExists(id).then(J.not)),
      ({ userId, body }) =>
        eventTypesRepo
          .createEventType(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/event-types/:id',
      eventTypesRepo.eventTypeExists,
      patchBody(),
      ({ params, body }) =>
        eventTypesRepo
          .updateEventType(
            params.id,
            J.compose(J.filterEmptyProps, J.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
