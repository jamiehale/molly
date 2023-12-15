import express from 'express';
import {
  get,
  post,
  patch,
  withUserId,
  withPayload,
  withParams,
  optionalField,
  withInitialContext,
  withErrorHandling,
  withJsonResponse,
} from '../resource-helpers';
import {
  readAllEvents,
  readEvent,
  createEvent,
  updateEvent,
  eventExists,
} from '../data/events';
import { required, optional, validResource } from '../validation';
import { eventTypeExists } from '../data/event-types';
import { locationExists } from '../data/locations';
import { composeP, curry } from '../util';

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

const resourceParams = (repo) => ({
  id: validResource(repo),
});

const routes = (a) =>
  a.reduce((router, r) => {
    r(router);
    return router;
  }, express.Router());

export const eventRoutes = (db) => {
  const repo = {
    create: createEvent(db),
    readAll: readAllEvents(db),
    readSingle: readEvent(db),
    exists: eventExists(db),
    update: updateEvent(db),
    // del: deleteEvent,
  };

  const eventTypeRepo = {
    exists: eventTypeExists(db),
  };

  const locationRepo = {
    exists: locationExists(db),
  };

  console.log(repo);

  const getAllResources = curry((path, repo, router) =>
    router.get(
      path,
      withInitialContext(
        withErrorHandling(withJsonResponse((context) => repo.readAll())),
      ),
    ),
  );

  const getSingleResource = curry((path, repo, router) =>
    router.get(
      `${path}/:id`,
      withInitialContext(
        withErrorHandling(
          withJsonResponse(
            withParams(resourceParams(repo), (context) =>
              repo.readSingle(context.params.id),
            ),
          ),
        ),
      ),
    ),
  );
  const postResource = curry(
    (path, repo, payload, resourceFromPayload, router) =>
      router.post(
        path,
        withInitialContext(
          withErrorHandling(
            withJsonResponse(
              withUserId(
                withPayload(payload, (context) =>
                  repo.create(
                    resourceFromPayload(context.userId, context.payload),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
  );
  const patchResource = curry(
    (path, repo, payload, fieldsFromPayload, router) =>
      router.patch(
        `${path}/:id`,
        withInitialContext(
          withErrorHandling(
            withJsonResponse(
              withParams(
                resourceParams(repo),
                withPayload(payload, (context) => {
                  console.log(context);
                  return repo.update(
                    context.params.id,
                    fieldsFromPayload(context.payload),
                  );
                }),
              ),
            ),
          ),
        ),
      ),
  );

  return routes([
    getAllResources('/events', repo),
    getSingleResource('/events', repo),
    postResource(
      '/events',
      repo,
      postEventPayload(eventTypeRepo, locationRepo),
      eventFromPayload,
    ),
    patchResource(
      '/events',
      repo,
      patchEventPayload(eventTypeRepo, locationRepo),
      eventFieldsFromPayload,
    ),
  ]);
};
