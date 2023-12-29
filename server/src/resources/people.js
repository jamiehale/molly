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
  'genderTitle',
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
  childrenRepo,
  gendersRepo,
  parentChildrenRepo,
  parentsRepo,
  parentRolesRepo,
  peopleRepo,
}) =>
  routes([
    getSingleResource('/people/:id', peopleRepo.personExists, ({ params }) =>
      peopleRepo.readPerson(params.id).then(toResult),
    ),
    getAllResources('/people', query(), ({ query }) => {
      if (query.q) {
        return peopleRepo.queryPeople(query.q).then(J.map(toResult));
      }
      return peopleRepo.readAllPeople().then(J.map(toResult));
    }),
    postResource(
      '/people',
      postBody(gendersRepo.genderExists),
      ({ userId, body }) =>
        peopleRepo
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
      peopleRepo.personExists,
      patchBody(gendersRepo.genderExists),
      ({ params, body }) =>
        peopleRepo
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
      peopleRepo.personExists,
      ({ params }) =>
        childrenRepo
          .readAllChildren({ parentId: params.id })
          .then(J.map(toChildResult)),
    ),
    postChildResource(
      '/people/:id/children',
      peopleRepo.personExists,
      postChildBody(peopleRepo.personExists, parentRolesRepo.parentRoleExists),
      ({ params, body, userId }) =>
        parentChildrenRepo.createParentChild(
          J.compose(
            J.assoc('creatorId', userId),
            J.assoc('parentId', params.id),
            J.pick(['childId', 'parentRoleId']),
          )(body),
        ),
    ),
    getAllChildResources(
      '/people/:id/parents',
      peopleRepo.personExists,
      ({ params }) =>
        parentsRepo
          .readAllParents({ childId: params.id })
          .then(J.map(toParentResult)),
    ),
    postChildResource(
      '/people/:id/parents',
      peopleRepo.personExists,
      postParentBody(peopleRepo.personExists, parentRolesRepo.parentRoleExists),
      ({ params, body, userId }) =>
        parentChildrenRepo.createParentChild(
          J.compose(
            J.assoc('creatorId', userId),
            J.assoc('childId', params.id),
            J.pick(['parentId', 'parentRoleId']),
          )(body),
        ),
    ),
  ]);
