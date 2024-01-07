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

export const collectionRoutes = ({
  artifactTypesRepo,
  artifactsRepo,
  artifactSourcesRepo,
  collectionsRepo,
}) =>
  routes([
    getSingleResource(
      '/collections/:id',
      collectionsRepo.collectionExists,
      ({ params }) => collectionsRepo.readCollection(params.id).then(toResult),
    ),
    getAllResources('/collections', V.any(), () =>
      collectionsRepo.readAllCollections().then(J.map(toResult)),
    ),
    postResource('/collections', postBody(), ({ userId, body }) =>
      collectionsRepo
        .createCollection(
          J.compose(
            J.assoc('creatorId', userId),
            J.pick(['title', 'shortName', 'description', 'creatorId']),
          )(body),
        )
        .then(toResult),
    ),
    patchResource(
      '/collections/:id',
      collectionsRepo.collectionExists,
      patchBody(),
      ({ params, body }) =>
        collectionsRepo
          .updateCollection(
            params.id,
            J.compose(
              J.filterEmptyProps,
              J.pick(['title', 'shortName', 'description']),
            )(body),
          )
          .then(toResult),
    ),
    getAllChildResources(
      '/collections/:id/artifacts',
      collectionsRepo.collectionExists,
      ({ params }) =>
        artifactsRepo
          .readAllArtifacts({ collectionId: params.id })
          .then(J.map(toArtifactResult)),
    ),
    postChildResource(
      '/artifact-collections/:id/artifacts',
      collectionsRepo.collectionExists,
      postArtifactBody(
        artifactTypesRepo.artifactTypeExists,
        artifactSourcesRepo.artifactSourceExists,
      ),
      ({ userId, params, body }) =>
        artifactsRepo
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
