import { ParameterError } from './error';
import { always, identityP, ifElse, isUndefined, throwIfFalse } from './util';
import * as U from './util';

const removeEmptyValues = (o) =>
  Object.keys(o).reduce(
    (acc, key) => (o[key] === undefined ? acc : { ...acc, [key]: o[key] }),
    {},
  );

export const any = () => async (o) => o;

export const and =
  (v1, ...vs) =>
  (o) =>
    vs.reduce(
      (pAcc, v) => pAcc.then((acc) => v({ scope: o.scope, value: acc })),
      v1(o),
    );

// export const check = (validateFn, checkFn) => (o) =>
export const object =
  (descriptor) =>
  ({ scope, value }) => {
    if (U.type(value) !== 'Object') {
      throw new ParameterError(
        `${scope}: expecting object but got ${U.type(value)}`,
      );
    }
    return Object.keys(descriptor).reduce(
      (pAcc, key) =>
        pAcc.then((acc) =>
          descriptor[key]({
            scope: key,
            value: value[key],
          }).then((result) => ({
            ...acc,
            ...(U.isUndefined(result) ? {} : { [key]: result }),
          })),
        ),
      Promise.resolve({}),
    );
  };

// export const validate = (descriptor, body) =>
//   Object.keys(descriptor)
//     .reduce(
//       (pAcc, field) =>
//         pAcc.then((acc) =>
//           descriptor[field]({ field, value: body[field], body }).then(
//             ({ value }) => ({ ...acc, [field]: value }),
//           ),
//         ),
//       Promise.resolve({}),
//     )
//     .then(removeEmptyValues);

const defaultRequiredErrorFn = ({ scope }) =>
  new ParameterError(`${scope}: required`);

export const required =
  (errorFn = defaultRequiredErrorFn) =>
  async (o) => {
    if (o.value === undefined) {
      throw errorFn(o);
    }
    return o.value;
  };

const defaultMatchesErrorFn =
  (regex) =>
  ({ value, scope }) =>
    new ParameterError(`${scope}: '${value}' does not match pattern ${regex}`);

export const matches =
  (regex, errorFn = defaultMatchesErrorFn(regex)) =>
  async (o) => {
    if (!regex.test(o.value)) {
      throw errorFn(o);
    }
    return o.value;
  };

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isUuid = (errorFn = defaultMatchesErrorFn(UUID_REGEX)) =>
  matches(UUID_REGEX, errorFn);

export const optional = (ifPresentFn) => async (o) => {
  if (o.value === undefined) {
    return o.value;
  }
  if (ifPresentFn) {
    return ifPresentFn(o);
  }
  return o.value;
};

const defaultIsNullErrorFn = ({ scope }) =>
  new ParameterError(`${scope}: expected null`);

export const isNull =
  (errorFn = defaultIsNullErrorFn) =>
  async (o) => {
    if (o.value !== null) {
      throw errorFn(o);
    }
    return o.value;
  };

const defaultIsNotNullErrorFn = ({ scope }) =>
  new ParameterError(`${scope}: expected not null`);

export const isNotNull =
  (errorFn = defaultIsNotNullErrorFn) =>
  async (o) => {
    if (o.value === null) {
      throw errorFn(o);
    }
    return o.value;
  };

const defaultEitherErrorFn = (eitherErr, orErr, { scope }) =>
  new ParameterError(
    `${scope}: doesn't match either expected condition (${eitherErr.message}, ${orErr.message})`,
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
        throw errorFn(eitherErr, orErr, o);
      }
    }
  };

const defaultValidResourceErrorFn = ({ scope, value }) =>
  new ParameterError(`${scope}: invalid resource id '${value}'`);

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
        .then(always(o.value)),
  );

const defaultValidDateValueErrorFn = ({ scope, value }) =>
  new ParameterError(`${scope}: invalid date ${value}`);

export const validDateValue =
  (errorFn = defaultValidDateValueErrorFn) =>
  async (o) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(o.value)) {
      if (isNaN(Date.parse(o.value))) {
        throw errorFn(o);
      }
      return o.value;
    }
    if (/^(abt )?\d{4}$/.test(o.value.toLowerCase())) {
      return o.value;
    }
    throw errorFn(o);
  };
