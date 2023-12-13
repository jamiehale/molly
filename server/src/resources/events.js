import express from 'express';
import {
  get,
  post,
  patch,
  withUserId,
  withPayload,
  withParams,
  optionalField,
} from '../resource-helpers';
import {
  readAllEvents,
  readEvent,
  createEvent,
  updateEvent,
} from '../data/events';
import {
  required,
  optional,
  validEventType,
  validLocation,
  validEventId,
} from '../validation';

const postEventPayload = (db) => ({
  title: required(),
  typeId: required(validEventType(db)),
  dateValue: optional(),
  locationId: optional(validLocation(db)),
});

const eventFromPayload = (userId, payload) => ({
  title: payload.title,
  description: payload.description,
  typeId: payload.typeId,
  sourceId: payload.sourceId,
  creatorId: userId,
});

const eventParams = (db) => ({
  id: required(validEventId(db)),
});

const patchEventPayload = (db) => ({
  title: optional(),
  typeId: optional(validEventType(db)),
  dateValue: optional(),
  locationId: optional(validLocation(db)),
});

const eventFieldsFromPayload = (payload) => ({
  ...optionalField('title', payload),
  ...optionalField('typeId', payload, 'type_id'),
  ...optionalField('dateValue', payload, 'date_value'),
  ...optionalField('locationId', payload, 'location_id'),
});

export const eventRoutes = (db) => {
  const router = express.Router();

  // events
  get(router, '/events', () => readAllEvents(db));

  get(
    router,
    '/events/:id',
    withParams(eventParams(db), (context) => readEvent(db, context.params.id)),
  );

  post(
    router,
    '/events',
    withUserId(
      withPayload(postEventPayload(db), (context) =>
        createEvent(db, eventFromPayload(context.userId, context.payload)),
      ),
    ),
  );

  patch(
    router,
    '/events/:id',
    withParams(
      eventParams(db),
      withPayload(patchEventPayload(db), (context) =>
        updateEvent(
          db,
          context.params.id,
          eventFieldsFromPayload(context.payload),
        ),
      ),
    ),
  );

  return router;
};
