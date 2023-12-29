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

const toResult = J.pick(['id', 'title']);

export const artifactTypeRoutes = ({ artifactTypesRepo }) =>
  routes([
    getSingleResource(
      '/artifact-types/:id',
      artifactTypesRepo.artifactTypeExists,
      ({ params }) =>
        artifactTypesRepo.readArtifactType(params.id).then(toResult),
    ),
    getAllResources('/artifact-types', V.any(), () =>
      artifactTypesRepo.readAllArtifactTypes().then(J.map(toResult)),
    ),
    postResource(
      '/artifact-types',
      postBody((id) => artifactTypesRepo.artifactTypeExists(id).then(J.not)),
      ({ userId, body }) =>
        artifactTypesRepo
          .createArtifactType(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/artifact-types/:id',
      artifactTypesRepo.artifactTypeExists,
      patchBody(),
      ({ params, body }) =>
        artifactTypesRepo
          .updateArtifactType(
            params.id,
            J.compose(J.filterEmptyProps, J.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
