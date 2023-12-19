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

export const artifactTypeRoutes = ({ artifactTypeRepo }) =>
  routes([
    ...baseResourceRoutes(
      'artifact-type',
      (id) => artifactTypeRepo.artifactTypeExists(id),
      ({ params }) => artifactTypeRepo.readArtifactType(params.id),
      () => artifactTypeRepo.readAllArtifactTypes(),
      postArtifactTypePayload(),
      ({ userId, payload }) =>
        artifactTypeRepo.createArtifactType(
          artifactTypeFromPayload(userId, payload),
        ),
      patchArtifactTypePayload(),
      ({ params, payload }) =>
        artifactTypeRepo.updateArtifactType(
          params.id,
          artifactTypeFieldsFromPayload(payload),
        ),
      withUserId,
    ),
  ]);
