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

export const eventArtifactRoleRoutes = ({ eventArtifactRolesRepo }) =>
  routes([
    getSingleResource(
      '/event-artifact-roles/:id',
      eventArtifactRolesRepo.eventArtifactRoleExists,
      ({ params }) =>
        eventArtifactRolesRepo.readEventArtifactRole(params.id).then(toResult),
    ),
    getAllResources('/event-artifact-roles', V.any(), () =>
      eventArtifactRolesRepo.readAllEventArtifactRoles().then(J.map(toResult)),
    ),
    postResource(
      '/event-artifact-roles',
      postBody((id) =>
        eventArtifactRolesRepo.eventArtifactRoleExists(id).then(J.not),
      ),
      ({ userId, body }) =>
        eventArtifactRolesRepo
          .createEventArtifactRole(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/event-artifact-roles/:id',
      eventArtifactRolesRepo.eventArtifactRoleExists,
      patchBody(),
      ({ params, body }) =>
        eventArtifactRolesRepo
          .updateEventArtifactRole(
            params.id,
            J.compose(J.filterEmptyProps, J.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
