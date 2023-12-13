import { HttpError, NotFoundError, isHttpError } from './error';
import { ifElse, isUndefined, throwIfEmpty, throwIfNil } from './util';

export const validate = (descriptor, body) =>
  Object.keys(descriptor)
    .reduce(
      (pAcc, field) =>
        pAcc.then((acc) =>
          descriptor[field]({ field, value: body[field], body }).then(
            (value) => ({ ...acc, [field]: value }),
          ),
        ),
      Promise.resolve({}),
    )
    .catch((err) => {
      if (isHttpError(err)) {
        throw err;
      }
      throw new HttpError(err.message, 400);
    });

const endOfChain = ({ value }) => Promise.resolve(value);

export const required =
  (next = endOfChain) =>
  async (o) => {
    const { field, value, body } = o;
    if (value === undefined) {
      throw new Error(`Missing required value '${field}'`);
    }
    return next(o);
  };

export const optional =
  (next = endOfChain) =>
  async (o) =>
    next(o);

export const validArtifactType = (db, next = endOfChain) =>
  ifElse(
    (o) => isUndefined(o.value),
    next,
    (o) =>
      db('artifact_types')
        .where({ id: o.value })
        .then(
          throwIfEmpty(() => new NotFoundError(`Artifact type '${o.value}'`)),
        )
        .then(() => next(o)),
  );

export const validArtifactSource = (db, next = endOfChain) =>
  ifElse(
    (o) => isUndefined(o.value),
    next,
    (o) =>
      db('artifact_sources')
        .where({ id: o.value })
        .then(
          throwIfEmpty(() => new NotFoundError(`Artifact source '${o.value}'`)),
        )
        .then(() => next(o)),
  );

export const validArtifactId = (db, next = endOfChain) =>
  ifElse(
    (o) => isUndefined(o.value),
    next,
    (o) =>
      db('artifacts')
        .where({ id: o.value })
        .then(throwIfEmpty(() => new NotFoundError(`Artifact id '${o.value}'`)))
        .then(() => next(o)),
  );

export const validEventId = (db, next = endOfChain) =>
  ifElse(
    (o) => isUndefined(o.value),
    next,
    (o) =>
      db('events')
        .where({ id: o.value })
        .then(throwIfEmpty(() => new NotFoundError(`Event id '${o.value}'`)))
        .then(() => next(o)),
  );

export const validEventType = (db, next = endOfChain) =>
  ifElse(
    (o) => isUndefined(o.value),
    next,
    (o) =>
      db('event_types')
        .where({ id: o.value })
        .then(throwIfEmpty(() => new NotFoundError(`Event type '${o.value}'`)))
        .then(() => next(o)),
  );

export const validLocation = (db, next = endOfChain) =>
  ifElse(
    (o) => isUndefined(o.value),
    next,
    (o) =>
      db('locations')
        .where({ id: o.value })
        .then(throwIfEmpty(() => new NotFoundError(`Event type '${o.value}'`)))
        .then(() => next(o)),
  );
