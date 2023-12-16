import {
  optionalField,
  routes,
  withUserId,
  baseResourceRoutes,
} from '../resource-helpers';
import { required, optional } from '../validation';

const postLocationPayload = () => ({
  value: required(),
});

const locationFromPayload = (userId, payload) => ({
  value: payload.value,
});

const patchLocationPayload = () => ({
  value: optional(),
});

const locationFieldsFromPayload = (payload) => ({
  ...optionalField('value', payload),
});

export const locationRoutes = ({ locationRepo }) =>
  routes([
    ...baseResourceRoutes(
      'location',
      (id) => locationRepo.locationExists(id),
      ({ params }) => locationRepo.readLocation(params.id),
      () => locationRepo.readAllLocations(),
      postLocationPayload(),
      ({ userId, payload }) =>
        locationRepo.createLocation(locationFromPayload(userId, payload)),
      patchLocationPayload(),
      ({ params, payload }) =>
        locationRepo.updateLocation(
          params.id,
          locationFieldsFromPayload(payload),
        ),
      withUserId,
    ),
  ]);
