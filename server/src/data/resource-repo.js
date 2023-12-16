import { ParameterError, toInternalError } from '../error';
import { capitalize, plural } from '../util';

const createResource = (store) => (newResource) =>
  store.create(newResource).catch(toInternalError);

const readResource = (store) => (id) =>
  store.readSingle({ id }).catch(toInternalError);

const readAllResources =
  (store) =>
  (filters = {}) =>
    store.readAll(filters).catch(toInternalError);

const resourceExists = (store) => (id) =>
  store.exists({ id }).catch(toInternalError);

const updateResource = (store) => async (id, fields) => {
  if (Object.keys(fields).length === 0) {
    throw new ParameterError('No fields to update');
  }
  return store.updateSingle({ id }, fields).catch(toInternalError);
};

const updateAllResources = (store) => async (filters, fields) => {
  if (Object.keys(fields).length === 0) {
    throw new ParameterError('No fields to update');
  }
  return store.updateAll(filters, fields).catch(toInternalError);
};

export const baseResourceRepo = (name, store) => ({
  [`create${capitalize(name)}`]: createResource(store),
  [`read${capitalize(name)}`]: readResource(store),
  [`readAll${capitalize(plural(name))}`]: readAllResources(store),
  [`${name}Exists`]: resourceExists(store),
  [`update${capitalize(name)}`]: updateResource(store),
  [`updateAll${capitalize(plural(name))}`]: updateAllResources(store),
});
