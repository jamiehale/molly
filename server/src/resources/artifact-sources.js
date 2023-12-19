import {
  optionalField,
  routes,
  baseResourceRoutes,
  withUserId,
} from '../resource-helpers';
import { required, optional } from '../validation';

const postArtifactSourcePayload = () => ({
  title: required(),
});

const artifactSourceFromPayload = (userId, payload) => ({
  title: payload.title,
});

const patchArtifactSourcePayload = () => ({
  title: optional(),
});

const artifactSourceFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
});

export const artifactSourceRoutes = ({ artifactSourceRepo }) =>
  routes([
    ...baseResourceRoutes(
      'artifact-source',
      (id) => artifactSourceRepo.artifactSourceExists(id),
      ({ params }) => artifactSourceRepo.readArtifactSource(params.id),
      () => artifactSourceRepo.readAllArtifactSources(),
      postArtifactSourcePayload(),
      ({ userId, payload }) =>
        artifactSourceRepo.createArtifactSource(
          artifactSourceFromPayload(userId, payload),
        ),
      patchArtifactSourcePayload(),
      ({ params, payload }) =>
        artifactSourceRepo.updateArtifactSource(
          params.id,
          artifactSourceFieldsFromPayload(payload),
        ),
      withUserId,
    ),
  ]);
