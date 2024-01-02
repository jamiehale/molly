import * as J from './jlib';

export const required = (errorFn) => (name, field, value) => {
  if (J.isUndefined(value) || value === null || value === '') {
    return errorFn(name, field, value);
  }
  return undefined;
};

export const validateField = (name, field, value) =>
  (field.validates || []).reduce(
    (acc, validator) => acc || validator(name, field, value),
    undefined,
  );

export const validate = (fields, values) =>
  J.filterEmptyProps(
    Object.keys(fields).reduce(
      (acc, field) => ({
        ...acc,
        [field]: validateField(field, fields[field], values[field]),
      }),
      {},
    ),
  );
