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

const artifactCollection = (userId, payload) => ({
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

const toResult = {
  id: U.prop('id'),
  title: U.prop('title'),
  shortName: U.prop('shortName'),
  description: U.prop('description'),
  creatorId: U.prop('creatorId'),
};

const toArtifactResult = {
  id: U.prop('id'),
};

export const artifactCollectionRoutes = ({
  artifactCollectionRepo,
  artifactRepo,
}) =>
  routes([
    getSingleResource(
      '/artifact-collection/:id',
      params((id) => artifactCollectionRepo.artifactCollectionExists(id)),
      ({ params }) =>
        artifactCollectionRepo
          .readArtifactCollection(params.id)
          .then(U.transform(toResult)),
    ),
    getAllResources('/artifact-collections', V.any(), () =>
      artifactCollectionRepo
        .readAllArtifactCollections()
        .then(U.map(U.transform(toResult))),
    ),
    postResource(
      '/artifact-collections',
      postBody(
        (id) => artifactTypeRepo.artifactTypeExists(id),
        (id) => artifactSourceRepo.artifactSourceExists(id),
      ),
      ({ userId, body }) =>
        artifactCollectionRepo
          .createArtifactCollection(artifactCollection(userId, body))
          .then(U.transform(toResult)),
    ),
    patchResource(
      '/artifact-collections/:id',
      params((id) => artifactCollectionRepo.artifactCollectionExists(id)),
      patchBody(
        (id) => artifactTypeRepo.artifactTypeExists(id),
        (id) => artifactSourceRepo.artifactSourceExists(id),
      ),
      ({ params, body }) =>
        artifactCollectionRepo
          .updateArtifactCollection(
            params.id,
            artifactCollectionFieldsFromPayload(body),
          )
          .then(U.transform(toResult)),
    ),
    (router) =>
      router.get(
        '/artifact-collections/:id/artifacts',
        withContext(
          U.composeP(
            ({ params }) =>
              artifactRepo
                .readAllArtifacts({ collectionId: params.id })
                .then(U.map(U.transform(toArtifactResult))),
            withParams(
              params((id) =>
                artifactCollectionRepo.artifactCollectionExists(id),
              ),
            ),
            withUserId,
          ),
        ),
      ),
  ]);

/*
  // assets
  get(
    router,
    '/artifacts/:id/assets',
    withParams(artifactParams(db), (context) =>
      readAllAssetsByArtifactId(db, context.params.id),
    ),
  );

  post(
    router,
    '/artifacts/:id/assets',
    withParams(
      artifactParams(db),
      withUserId(
        withPayload(postArtifactAssetPayload(), (context) =>
          createAsset(
            db,
            assetFromPayload(
              context.userId,
              context.params.id,
              context.payload,
            ),
          ),
        ),
      ),
    ),
  );

  return router;
};
*/
