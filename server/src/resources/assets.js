import {
  optionalField,
  routes,
  baseResourceRoutes,
  withUserId,
} from '../resource-helpers';
import { required, optional } from '../validation';

const postArtifactTypePayload = () => ({
  title: required(),
});

const artifactTypeFromPayload = (userId, payload) => ({
  title: payload.title,
});

const patchArtifactTypePayload = () => ({
  title: optional(),
});

const artifactTypeFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
});

export const assetRoutes = ({ assetRepo }) =>
  routes([
    ...baseResourceRoutes(
      'asset',
      (id) => assetRepo.assetExists(id),
      ({ params }) => assetRepo.readAsset(params.id),
      () => assetRepo.readAllAssets(),
      postArtifactTypePayload(),
      ({ userId, payload }) =>
        assetRepo.createArtifactType(artifactTypeFromPayload(userId, payload)),
      patchArtifactTypePayload(),
      ({ params, payload }) =>
        assetRepo.updateArtifactType(
          params.id,
          artifactTypeFieldsFromPayload(payload),
        ),
      withUserId,
    ),
  ]);
