import {
  optionalField,
  routes,
  withUserId,
  withParams,
  getSingleResource,
  getAllResources,
  postResource,
  patchResource,
  withContext,
  getAllChildResources,
  postChildResource,
} from '../resource-helpers';
import * as V from '../validation';
import * as U from '../util';
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

const newArtifactCollection = (userId, payload) => ({
  title: payload.title,
  shortName: payload.shortName,
  description: payload.description,
  creatorId: userId,
});

const patchBody = () =>
  V.and(
    V.object({
      title: V.optional(V.isNotNull()),
      shortName: V.optional(V.isNotNull()),
      description: V.optional(),
    }),
    ({ value }) => {
      if (Object.keys(value).length === 0) {
        throw new ParameterError('No fields to update!');
      }
      return value;
    },
  );

const artifactCollectionFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('shortName', payload),
  ...optionalField('description', payload),
});

const params = (validArtifactCollectionFn) =>
  V.object({
    id: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validArtifactCollectionFn),
    ),
  });

const toResult = U.pick([
  'id',
  'title',
  'shortName',
  'description',
  'creatorId',
]);

const toArtifactResult = U.pick([
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
      '/artifact-collection/:id',
      params(artifactCollectionRepo.artifactCollectionExists),
      ({ params }) =>
        artifactCollectionRepo.readArtifactCollection(params.id).then(toResult),
    ),
    getAllResources('/artifact-collections', V.any(), () =>
      artifactCollectionRepo.readAllArtifactCollections().then(U.map(toResult)),
    ),
    postResource('/artifact-collections', postBody(), ({ userId, body }) =>
      artifactCollectionRepo
        .createArtifactCollection(
          U.compose(
            U.assoc('creatorId', userId),
            U.pick(['title', 'shortName', 'description', 'creatorId']),
          )(body),
        )
        .then(toResult),
    ),
    patchResource(
      '/artifact-collections/:id',
      params(artifactCollectionRepo.artifactCollectionExists),
      patchBody(),
      ({ params, body }) =>
        artifactCollectionRepo
          .updateArtifactCollection(
            params.id,
            U.compose(
              U.filterEmptyProps,
              U.pick(['title', 'shortName', 'description']),
            )(body),
          )
          .then(toResult),
    ),
    getAllChildResources(
      '/artifact-collections/:id/artifacts',
      params(artifactCollectionRepo.artifactCollectionExists),
      ({ params }) =>
        artifactRepo
          .readAllArtifacts({ collectionId: params.id })
          .then(U.map(toArtifactResult)),
    ),
    postChildResource(
      '/artifact-collections/:id/artifacts',
      params((id) => artifactCollectionRepo.artifactCollectionExists(id)),
      postArtifactBody(
        artifactTypeRepo.artifactTypeExists,
        artifactSourceRepo.artifactSourceExists,
      ),
      ({ userId, params, body }) =>
        artifactRepo
          .createArtifact(
            U.compose(
              U.assoc('collectionId', params.id),
              U.assoc('creatorId', userId),
              U.pick([
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
