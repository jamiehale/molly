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

export const eventPersonRoleRoutes = ({ eventPersonRolesRepo }) =>
  routes([
    getSingleResource(
      '/event-person-roles/:id',
      eventPersonRolesRepo.eventPersonRoleExists,
      ({ params }) =>
        eventPersonRolesRepo.readEventPersonRole(params.id).then(toResult),
    ),
    getAllResources('/event-person-roles', V.any(), () =>
      eventPersonRolesRepo.readAllEventPersonRoles().then(J.map(toResult)),
    ),
    postResource(
      '/event-person-roles',
      postBody((id) =>
        eventPersonRolesRepo.eventPersonRoleExists(id).then(J.not),
      ),
      ({ userId, body }) =>
        eventPersonRolesRepo
          .createEventPersonRole(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/event-person-roles/:id',
      eventPersonRolesRepo.eventPersonRoleExists,
      patchBody(),
      ({ params, body }) =>
        eventPersonRolesRepo
          .updateEventPersonRole(
            params.id,
            J.compose(J.filterEmptyProps, J.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
