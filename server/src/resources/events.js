import {
  optionalField,
  withInitialContext,
  withErrorHandling,
  withJsonResponse,
  withParams,
  routes,
  resourceParams,
  withUserId,
  withPayload,
  baseResourceRoutes,
} from '../resource-helpers';
import {
  required,
  optional,
  validResource,
  matches,
  isUuid,
  either,
  isNull,
} from '../validation';
import { composeP } from '../util';
import { ParameterError } from '../error';

const postEventPayload = (eventTypeRepo, locationRepo) => ({
  title: required(),
  typeId: composeP(
    validResource((id) => eventTypeRepo.eventTypeExists(id)),
    required(),
  ),
  dateValue: optional(),
  locationId: optional(
    composeP(
      validResource((id) => locationRepo.locationExists(id)),
      isUuid(),
    ),
  ),
});

const eventFromPayload = (userId, payload) => ({
  title: payload.title,
  description: payload.description,
  typeId: payload.typeId,
  dateValue: payload.dateValue,
  locationId: payload.locationId,
  sourceId: payload.sourceId,
  creatorId: userId,
});

const patchEventPayload = (eventTypeRepo, locationRepo) => ({
  title: optional(),
  typeId: optional(
    validResource(
      (id) => eventTypeRepo.eventTypeExists(id),
      ({ value }) => new ParameterError(`Invalid typeId '${value}'`),
    ),
  ),
  dateValue: optional(),
  locationId: optional(
    either(
      isNull(),
      composeP(
        validResource((id) => locationRepo.locationExists(id)),
        isUuid(),
      ),
    ),
  ),
});

const eventFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('typeId', payload),
  ...optionalField('dateValue', payload),
  ...optionalField('locationId', payload),
});

export const eventRoutes = ({
  artifactRepo,
  eventRepo,
  eventTypeRepo,
  locationRepo,
}) =>
  routes([
    ...baseResourceRoutes(
      'event',
      (id) => eventRepo.eventExists(id),
      ({ params }) => eventRepo.readEvent(params.id),
      () => eventRepo.readAllEvents(),
      postEventPayload(eventTypeRepo, locationRepo),
      ({ userId, payload }) =>
        eventRepo.createEvent(eventFromPayload(userId, payload)),
      patchEventPayload(eventTypeRepo, locationRepo),
      ({ params, payload }) => {
        console.log('wat', payload);
        return eventRepo.updateEvent(
          params.id,
          eventFieldsFromPayload(payload),
        );
      },
      withUserId,
    ),
    (router) =>
      router.get(
        '/events/:id/artifacts',
        withInitialContext(
          withErrorHandling(
            withUserId(
              withJsonResponse(
                withParams(
                  resourceParams((id) => eventRepo.exists(id)),
                  ({ params }) =>
                    artifactRepo.readAllArtifacts({ eventId: params.id }),
                ),
              ),
            ),
          ),
        ),
      ),
  ]);
