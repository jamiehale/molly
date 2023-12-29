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

const postBody = () =>
  V.object({
    value: V.and(V.required(), V.isNotNull()),
  });

const patchBody = () =>
  V.and(
    V.object({
      value: V.optional(V.isNotNull()),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const toResult = J.pick(['id', 'value']);

export const locationRoutes = ({ locationsRepo }) =>
  routes([
    getSingleResource(
      '/locations/:id',
      locationsRepo.locationExists,
      ({ params }) => locationsRepo.readLocation(params.id).then(toResult),
    ),
    getAllResources('/locations', V.any(), () =>
      locationsRepo.readAllLocations().then(J.map(toResult)),
    ),
    postResource('/locations', postBody(), ({ userId, body }) =>
      locationsRepo
        .createLocation(
          J.compose(J.assoc('creatorId', userId), J.pick(['value']))(body),
        )
        .then(toResult),
    ),
    patchResource(
      '/locations/:id',
      locationsRepo.locationExists,
      patchBody(),
      ({ params, body }) =>
        locationsRepo
          .updateLocation(
            params.id,
            J.compose(J.filterEmptyProps, J.pick(['value']))(body),
          )
          .then(toResult),
    ),
  ]);
