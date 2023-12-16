import { ParameterError } from './error';
import { always, identityP, ifElse, isUndefined, throwIfFalse } from './util';

const removeEmptyValues = (o) =>
  Object.keys(o).reduce(
    (acc, key) => (o[key] === undefined ? acc : { ...acc, [key]: o[key] }),
    {},
  );

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
    .then(removeEmptyValues);

const defaultRequiredErrorFn = ({ field }) =>
  new ParameterError(`Missing required value ${field}`);

export const required =
  (errorFn = defaultRequiredErrorFn) =>
  async (o) => {
    if (o.value === undefined) {
      throw errorFn(o);
    }
    return o;
  };

const defaultMatchesErrorFn =
  (regex) =>
  ({ value, field }) =>
    new ParameterError(`${value} (${field}) does not match ${regex}`);

export const matches =
  (regex, errorFn = defaultMatchesErrorFn(regex)) =>
  async (o) => {
    if (!regex.test(o.value)) {
      throw errorFn(o);
    }
    return o;
  };

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isUuid = (errorFn = defaultMatchesErrorFn(UUID_REGEX)) =>
  matches(UUID_REGEX, errorFn);

export const optional = (ifPresentFn) => async (o) => {
  if (o.value === undefined) {
    return o;
  }
  if (ifPresentFn) {
    return ifPresentFn(o);
  }
  return o;
};

const defaultIsNullErrorFn = (o) =>
  new ParameterError(`${o.field} expected to be null`);

export const isNull =
  (errorFn = defaultIsNullErrorFn) =>
  async (o) => {
    if (o.value !== null) {
      throw errorFn(o);
    }
    return o;
  };

const defaultEitherErrorFn = (eitherErr, orErr) =>
  new ParameterError(
    `${o.field} doesn't match either expected condition (${eitherErr.message}, ${orErr.message})`,
  );

export const either =
  (eitherFn, orFn, errorFn = defaultEitherErrorFn) =>
  async (o) => {
    try {
      const eitherO = { ...o };
      await eitherFn(eitherO);
      return eitherO;
    } catch (eitherErr) {
      try {
        const orO = { ...o };
        await orFn(orO);
        return orO;
      } catch (orErr) {
        throw errorFn(eitherErr, orErr);
      }
    }
  };

const defaultValidResourceErrorFn = ({ field, value }) =>
  new ParameterError(`Invalid resource id '${value}' (${field})`);

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
