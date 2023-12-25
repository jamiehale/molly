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

const postBody = (validGenderFn) =>
  V.object({
    id: V.and(V.required(), V.isNotNull(), V.availableKey(validGenderFn)),
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

export const genderRoutes = ({ genderRepo }) =>
  routes([
    getSingleResource('/genders/:id', genderRepo.genderExists, ({ params }) =>
      genderRepo.readGender(params.id).then(toResult),
    ),
    getAllResources('/genders', V.any(), () =>
      genderRepo.readAllGenders().then(U.map(toResult)),
    ),
    postResource(
      '/genders',
      postBody((id) => genderRepo.genderExists(id).then(U.not)),
      ({ userId, body }) =>
        genderRepo
          .createGender(
            U.compose(
              U.assoc('creatorId', userId),
              U.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/genders/:id',
      genderRepo.genderExists,
      patchBody(),
      ({ params, body }) =>
        genderRepo
          .updateGender(
            params.id,
            U.compose(U.filterEmptyProps, U.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
