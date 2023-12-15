import { HttpError, isHttpError } from './error';
import { always, identityP, ifElse, isUndefined, throwIfFalse } from './util';

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

const defaultValidResourceErrorFn = ({ field, value }) =>
  new Error(`Invalid resource id '${value}' (${field})`);

export const validResource = (
  validateResourceIdFn,
  errorFn = defaultValidResourceErrorFn,
) =>
  ifElse(
    (o) => isUndefined(o.value),
    identityP,
    (o) =>
      validateResourceIdFn(o.value)
        .then(throwIfFalse(() => errorFn(o)))
        .then(always(o)),
  );
