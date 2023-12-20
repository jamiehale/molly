import {
  routes,
  getSingleResource,
  getAllResources,
  postResource,
  patchResource,
} from '../resource-helpers';
import * as V from '../validation';
import * as U from '../util';
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

const toResult = U.pick(['id', 'value']);

export const locationRoutes = ({ locationRepo }) =>
  routes([
    getSingleResource(
      '/locations/:id',
      locationRepo.locationExists,
      ({ params }) => locationRepo.readLocation(params.id).then(toResult),
    ),
    getAllResources('/locations', V.any(), () =>
      locationRepo.readAllLocations().then(U.map(toResult)),
    ),
    postResource('/locations', postBody(), ({ userId, body }) =>
      locationRepo
        .createLocation(
          U.compose(U.assoc('creatorId', userId), U.pick(['value']))(body),
        )
        .then(toResult),
    ),
    patchResource(
      '/locations/:id',
      locationRepo.locationExists,
      patchBody(),
      ({ params, body }) =>
        locationRepo
          .updateLocation(
            params.id,
            U.compose(U.filterEmptyProps, U.pick(['value']))(body),
          )
          .then(toResult),
    ),
  ]);
