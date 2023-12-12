import { HttpError, isHttpError } from './error';
import { throwIfNil } from './util';

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
    if (!value) {
      throw new Error(`Missing required value '${field}'`);
    }
    return next(o);
  };

export const validArtifactType =
  (db, next = endOfChain) =>
  (o) =>
    db('artifact_types')
      .where({ id: o.value })
      .then(
        throwIfNil(
          () => new Error(`Invalid artifact type '${o.value}' in ${o.field}`),
        ),
      )
      .then(() => next(o));

export const validArtifactSource =
  (db, next = endOfChain) =>
  (o) =>
    db('artifact_sources')
      .where({ id: o.value })
      .then(
        throwIfNil(
          () => new Error(`Invalid artifact source '${o.value}' in ${o.field}`),
        ),
      )
      .then(() => next(o));

export const validArtifactId =
  (db, next = endOfChain) =>
  (o) =>
    db('artifacts')
      .where({ id: o.value })
      .then(throwIfNil(() => new HttpError('Not found', 404)))
      .then(() => next(o));
