import { HttpError, NotFoundError, isHttpError } from './error';
import {
  always,
  identity,
  identityP,
  ifElse,
  isUndefined,
  prop,
  throwIfEmpty,
  throwIfFalse,
  throwIfNil,
} from './util';
import { readEventType } from './data/event-types';

export const validate = (descriptor, body) =>
  Object.keys(descriptor)
    .reduce(
      (pAcc, field) =>
        pAcc.then((acc) =>
          descriptor[field]({ field, value: body[field], body }).then(
            ({ value }) => ({ ...acc, [field]: value }),
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

const defaultRequiredErrorFn = ({ field }) =>
  new Error(`Missing required value ${field}`);

export const required =
  (errorFn = defaultRequiredErrorFn) =>
  async (o) => {
    if (o.value === undefined) {
      throw errorFn(o);
    }
    return o;
  };

export const optional = async (o) => o;

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

export const validEvent = (db, next = endOfChain) =>
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
      readEventType(db, o.value)
        .then(throwIfNil(() => new NotFoundError(`Event type '${o.value}'`)))
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

const defaultValidResourceErrorFn = ({ field, value }) =>
  new Error(`Invalid resource id '${value}' (${field})`);

export const validResource = (repo, errorFn = defaultValidResourceErrorFn) =>
  ifElse(
    (o) => isUndefined(o.value),
    identityP,
    (o) =>
      repo
        .exists(o.value)
        .then(throwIfFalse(() => errorFn(o)))
        .then(always(o)),
  );
