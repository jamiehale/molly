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
import * as J from '../jlib';
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

const postParentBody = (validParentFn, validParentRoleFn) =>
  V.object({
    parentId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validParentFn),
    ),
    parentRoleId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validParentRoleFn),
    ),
  });

const toResult = J.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
]);

const toChildResult = J.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
  'parentRoleId',
  'parentRoleTitle',
]);

const toParentResult = J.pick([
  'id',
  'givenNames',
  'surname',
  'genderId',
  'creatorId',
  'parentRoleId',
  'parentRoleTitle',
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
        return personRepo.queryPeople(query.q).then(J.map(toResult));
      }
      return personRepo.readAllPeople().then(J.map(toResult));
    }),
    postResource(
      '/people',
      postBody(genderRepo.genderExists),
      ({ userId, body }) =>
        personRepo
          .createPerson(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['givenNames', 'surname', 'genderId']),
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
            J.compose(
              J.filterEmptyProps,
              J.pick(['givenNames', 'surname', 'genderId']),
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
          .then(J.map(toChildResult)),
    ),
    postChildResource(
      '/people/:id/children',
      personRepo.personExists,
      postChildBody(personRepo.personExists, parentRoleRepo.parentRoleExists),
      ({ params, body, userId }) =>
        parentChildRepo.createParentChild(
          J.compose(
            J.assoc('creatorId', userId),
            J.assoc('parentId', params.id),
            J.pick(['childId', 'parentRoleId']),
          )(body),
        ),
    ),
    getAllChildResources(
      '/people/:id/parents',
      personRepo.personExists,
      ({ params }) =>
        parentRepo
          .readAllParents({ childId: params.id })
          .then(J.map(toParentResult)),
    ),
    postChildResource(
      '/people/:id/parents',
      personRepo.personExists,
      postParentBody(personRepo.personExists, parentRoleRepo.parentRoleExists),
      ({ params, body, userId }) =>
        parentChildRepo.createParentChild(
          J.compose(
            J.assoc('creatorId', userId),
            J.assoc('childId', params.id),
            J.pick(['parentId', 'parentRoleId']),
          )(body),
        ),
    ),
  ]);
