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

const toResult = J.pick(['id', 'title']);

export const genderRoutes = ({ genderRepo }) =>
  routes([
    getSingleResource('/genders/:id', genderRepo.genderExists, ({ params }) =>
      genderRepo.readGender(params.id).then(toResult),
    ),
    getAllResources('/genders', V.any(), () =>
      genderRepo.readAllGenders().then(J.map(toResult)),
    ),
    postResource(
      '/genders',
      postBody((id) => genderRepo.genderExists(id).then(J.not)),
      ({ userId, body }) =>
        genderRepo
          .createGender(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['id', 'title']),
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
            J.compose(J.filterEmptyProps, J.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
