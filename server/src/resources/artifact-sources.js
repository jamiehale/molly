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

const postBody = (validArtifactSourceFn) =>
  V.object({
    id: V.and(
      V.required(),
      V.isNotNull(),
      V.availableKey(validArtifactSourceFn),
    ),
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

export const artifactSourceRoutes = ({ artifactSourcesRepo }) =>
  routes([
    getSingleResource(
      '/artifact-sources/:id',
      artifactSourcesRepo.artifactSourceExists,
      ({ params }) =>
        artifactSourcesRepo.readArtifactSource(params.id).then(toResult),
    ),
    getAllResources('/artifact-sources', V.any(), () =>
      artifactSourcesRepo.readAllArtifactSources().then(J.map(toResult)),
    ),
    postResource(
      '/artifact-sources',
      postBody((id) =>
        artifactSourcesRepo.artifactSourceExists(id).then(J.not),
      ),
      ({ userId, body }) =>
        artifactSourcesRepo
          .createArtifactSource(
            J.compose(
              J.assoc('creatorId', userId),
              J.pick(['id', 'title']),
            )(body),
          )
          .then(toResult),
    ),
    patchResource(
      '/artifact-sources/:id',
      artifactSourcesRepo.artifactSourceExists,
      patchBody(),
      ({ params, body }) =>
        artifactSourcesRepo
          .updateArtifactSource(
            params.id,
            J.compose(J.filterEmptyProps, J.pick(['title']))(body),
          )
          .then(toResult),
    ),
  ]);
