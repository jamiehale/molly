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

const postBody = (validGenderFn) =>
  V.object({
    givenNames: V.optional(V.isNotNull()),
    surname: V.optional(V.isNotNull()),
    genderId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validGenderFn),
    ),
  });

const patchBody = (validGenderFn) =>
  V.and(
    V.object({
      givenNames: V.optional(V.isNotNull()),
      surname: V.optional(V.isNotNull()),
      genderId: V.optional(
        V.and(V.isNotNull(), V.validResource(validGenderFn)),
      ),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const toResult = U.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
]);

export const personRoutes = ({ personRepo, genderRepo }) =>
  routes([
    getSingleResource('/people/:id', personRepo.personExists, ({ params }) =>
      personRepo.readPerson(params.id).then(toResult),
    ),
    getAllResources('/people', V.any(), () =>
      personRepo.readAllPeople().then(U.map(toResult)),
    ),
    postResource(
      '/people',
      postBody(genderRepo.genderExists),
      ({ userId, body }) =>
        personRepo
          .createPerson(
            U.compose(
              U.assoc('creatorId', userId),
              U.pick(['givenNames', 'surname', 'genderId']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/people/:id',
      personRepo.personExists,
      patchBody(genderRepo.genderExists),
      ({ params, body }) =>
        personRepo
          .updatePerson(
            params.id,
            U.compose(
              U.filterEmptyProps,
              U.pick(['givenNames', 'surname', 'genderId']),
            )(body),
          )
          .then(toResult),
    ),
  ]);
