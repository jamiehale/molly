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

const postBody = (validArtifactTypeFn) =>
  V.object({
    id: V.and(V.required(), V.isNotNull(), V.availableKey(validArtifactTypeFn)),
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

export const artifactTypeRoutes = ({ artifactTypeRepo }) =>
  routes([
    getSingleResource(
      '/artifact-types/:id',
      artifactTypeRepo.artifactTypeExists,
      ({ params }) =>
        artifactTypeRepo.readArtifactType(params.id).then(toResult),
    ),
    getAllResources('/artifact-types', V.any(), () =>
      artifactTypeRepo.readAllArtifactTypes().then(U.map(toResult)),
    ),
    postResource(
      '/artifact-types',
      postBody((id) => artifactTypeRepo.artifactTypeExists(id).then(U.not)),
      ({ userId, body }) =>
        artifactTypeRepo
          .createArtifactType(
            U.compose(
              U.assoc('creatorId', userId),
              U.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/artifact-types/:id',
      artifactTypeRepo.artifactTypeExists,
      patchBody(),
      ({ params, body }) =>
        artifactTypeRepo
          .updateArtifactType(
            params.id,
            U.compose(U.filterEmptyProps, U.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
