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
} from '../resource-helpers';
import { required, optional, validResource } from '../validation';
import { composeP } from '../util';

const postEventPayload = (eventTypeRepo, locationRepo) => ({
  title: required(),
  typeId: composeP(required(), validResource(eventTypeRepo)),
  dateValue: optional,
  locationId: validResource(locationRepo),
});

const eventFromPayload = (userId, payload) => ({
  title: payload.title,
  description: payload.description,
  typeId: payload.typeId,
  sourceId: payload.sourceId,
  creatorId: userId,
});

const patchEventPayload = (eventTypeRepo, locationRepo) => ({
  title: optional,
  typeId: validResource(eventTypeRepo),
  dateValue: optional,
  locationId: validResource(locationRepo),
});

const eventFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('typeId', payload, 'type_id'),
  ...optionalField('dateValue', payload, 'date_value'),
  ...optionalField('locationId', payload, 'location_id'),
});

export const eventRoutes = ({
  artifactRepo,
  eventRepo,
  eventTypeRepo,
  locationRepo,
}) =>
  routes([
    (router) =>
      router.get(
        '/events/:id',
        withInitialContext(
          withErrorHandling(
            withJsonResponse(
              withParams(
                resourceParams((id) => eventRepo.eventExists(id)),
                ({ params }) => eventRepo.readEvent(params.id),
              ),
            ),
          ),
        ),
      ),
    (router) =>
      router.get(
        '/events',
        withInitialContext(
          withErrorHandling(withJsonResponse(() => eventRepo.readAllEvents())),
        ),
      ),
    (router) =>
      router.post(
        '/events',
        withInitialContext(
          withErrorHandling(
            withJsonResponse(
              withUserId(
                withPayload(
                  postEventPayload(eventTypeRepo, locationRepo),
                  ({ userId, payload }) =>
                    eventRepo.createEvent(resourceFromPayload(userId, payload)),
                ),
              ),
            ),
          ),
        ),
      ),
    (router) =>
      router.patch(
        '/events/:id',
        withInitialContext(
          withErrorHandling(
            withJsonResponse(
              withParams(
                resourceParams((id) => eventRepo.eventExists(id)),
                withPayload(
                  patchEventPayload(eventTypeRepo, locationRepo),
                  ({ params, payload }) =>
                    eventRepo.updateEvent(
                      params.id,
                      eventFieldsFromPayload(payload),
                    ),
                ),
              ),
            ),
          ),
        ),
      ),
    (router) =>
      router.get(
        '/events/:id/artifacts',
        withInitialContext(
          withErrorHandling(
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
  ]);
