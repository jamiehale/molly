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

const postBody = () =>
  V.object({
    title: V.and(V.required(), V.isNotNull()),
    shortName: V.and(V.required(), V.isNotNull()),
    description: V.optional(),
  });

const postArtifactBody = (validArtifactTypeFn, validArtifactSourceFn) =>
  V.object({
    title: V.and(V.required(), V.isNotNull()),
    description: V.optional(),
    typeId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validArtifactTypeFn),
    ),
    sourceId: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validArtifactSourceFn),
    ),
  });

const patchBody = () =>
  V.and(
    V.object({
      title: V.optional(V.isNotNull()),
      shortName: V.optional(V.isNotNull()),
      description: V.optional(),
    }),
    V.isNotEmpty(() => new ParameterError('No fields to update!')),
  );

const toResult = J.pick([
  'id',
  'title',
  'shortName',
  'description',
  'creatorId',
]);

const toArtifactResult = J.pick([
  'id',
  'title',
  'description',
  'typeId',
  'sourceId',
  'collectionId',
  'creatorId',
]);

export const artifactCollectionRoutes = ({
  artifactCollectionRepo,
  artifactRepo,
  artifactTypeRepo,
  artifactSourceRepo,
}) =>
  routes([
    getSingleResource(
      '/artifact-collections/:id',
      artifactCollectionRepo.artifactCollectionExists,
      ({ params }) =>
        artifactCollectionRepo.readArtifactCollection(params.id).then(toResult),
    ),
    getAllResources('/artifact-collections', V.any(), () =>
      artifactCollectionRepo.readAllArtifactCollections().then(J.map(toResult)),
    ),
    postResource('/artifact-collections', postBody(), ({ userId, body }) =>
      artifactCollectionRepo
        .createArtifactCollection(
          J.compose(
            J.assoc('creatorId', userId),
            J.pick(['title', 'shortName', 'description', 'creatorId']),
          )(body),
        )
        .then(toResult),
    ),
    patchResource(
      '/artifact-collections/:id',
      artifactCollectionRepo.artifactCollectionExists,
      patchBody(),
      ({ params, body }) =>
        artifactCollectionRepo
          .updateArtifactCollection(
            params.id,
            J.compose(
              J.filterEmptyProps,
              J.pick(['title', 'shortName', 'description']),
            )(body),
          )
          .then(toResult),
    ),
    getAllChildResources(
      '/artifact-collections/:id/artifacts',
      artifactCollectionRepo.artifactCollectionExists,
      ({ params }) =>
        artifactRepo
          .readAllArtifacts({ collectionId: params.id })
          .then(J.map(toArtifactResult)),
    ),
    postChildResource(
      '/artifact-collections/:id/artifacts',
      artifactCollectionRepo.artifactCollectionExists,
      postArtifactBody(
        artifactTypeRepo.artifactTypeExists,
        artifactSourceRepo.artifactSourceExists,
      ),
      ({ userId, params, body }) =>
        artifactRepo
          .createArtifact(
            J.compose(
              J.assoc('collectionId', params.id),
              J.assoc('creatorId', userId),
              J.pick([
                'title',
                'description',
                'typeId',
                'sourceId',
                'collectionId',
              ]),
            )(body),
          )
          .then(toArtifactResult),
    ),
  ]);
