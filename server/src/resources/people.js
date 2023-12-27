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
import * as U from '../util';
import { ParameterError } from '../error';

const query = () =>
  V.object({
    q: V.optional(V.isNotNull()),
  });

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

const postChildBody = (validChildfn, validParentRoleFn) =>
  V.object({
    childId: V.and(V.required(), V.isNotNull(), V.validResource(validChildfn)),
    parentRoleId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validParentRoleFn),
    ),
  });

const toResult = U.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
]);

const toChildResult = U.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
  'parentRoleId',
]);

const toParentResult = U.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
  'parentRoleId',
]);

export const personRoutes = ({
  childRepo,
  genderRepo,
  parentChildRepo,
  parentRepo,
  parentRoleRepo,
  personRepo,
}) =>
  routes([
    getSingleResource('/people/:id', personRepo.personExists, ({ params }) =>
      personRepo.readPerson(params.id).then(toResult),
    ),
    getAllResources('/people', query(), ({ query }) => {
      if (query.q) {
        return personRepo.queryPeople(query.q).then(U.map(toResult));
      }
      return personRepo.readAllPeople().then(U.map(toResult));
    }),
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
    getAllChildResources(
      '/people/:id/children',
      personRepo.personExists,
      ({ params }) =>
        childRepo
          .readAllChildren({ parentId: params.id })
          .then(U.map(toChildResult)),
    ),
    postChildResource(
      '/people/:id/children',
      personRepo.personExists,
      postChildBody(personRepo.personExists, parentRoleRepo.parentRoleExists),
      ({ params, body, userId }) =>
        parentChildRepo.createParentChild(
          U.compose(
            U.assoc('creatorId', userId),
            U.assoc('parentId', params.id),
            U.pick(['childId', 'parentRoleId']),
          )(body),
        ),
    ),
    getAllChildResources(
      '/people/:id/parents',
      personRepo.personExists,
      ({ params }) =>
        parentRepo
          .readAllParents({ childId: params.id })
          .then(U.map(toParentResult)),
    ),
  ]);
