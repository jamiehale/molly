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

const postBody = (validParentRoleFn) =>
  V.object({
    id: V.and(V.required(), V.isNotNull(), V.availableKey(validParentRoleFn)),
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

export const parentRoleRoutes = ({ parentRolesRepo }) =>
  routes([
    getSingleResource(
      '/parent-roles/:id',
      parentRolesRepo.parentRoleExists,
      ({ params }) => parentRolesRepo.readParentRole(params.id).then(toResult),
    ),
    getAllResources('/parent-roles', V.any(), () =>
      parentRolesRepo.readAllParentRoles().then(J.map(toResult)),
    ),
    postResource(
      '/parent-roles',
      postBody((id) => parentRolesRepo.parentRoleExists(id).then(J.not)),
      ({ userId, body }) =>
        parentRolesRepo
          .createParentRole(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/parent-roles/:id',
      parentRolesRepo.parentRoleExists,
      patchBody(),
      ({ params, body }) =>
        parentRolesRepo
          .updateParentRole(
            params.id,
            J.compose(J.filterEmptyProps, J.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
