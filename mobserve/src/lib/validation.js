import * as J from './jlib';

export const required = (errorFn) => (name, field, value) => {
  if (J.isUndefined(value) || value === null || value === '') {
    return errorFn(name, field, value);
  }
  return undefined;
};

export const isValidDate = (errorFn) => (name, field, value) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    if (isNaN(Date.parse(value))) {
      return errorFn();
    }
    return undefined;
  }
  if (/^(abt )?\d{4}$/.test(value.toLowerCase())) {
    return undefined;
  }
  if (/^\d{4}-\d{2}$/.test(value.toLowerCase())) {
    if (isNaN(Date.parse(`${value}-01`))) {
      return errorFn();
    }
    return undefined;
  }
  return errorFn();
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
