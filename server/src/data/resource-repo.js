import { capitalize, plural } from '../util';

const createResource = (store) => (newResource) => store.create(newResource);

const readResource = (store) => (id) => store.readSingle({ id });

const readAllResources =
  (store) =>
  (filters = {}) =>
    store.readAll(filters);

const resourceExists = (store) => (id) => store.exists({ id });

const updateResource = (store) => (id, fields) =>
  store.updateSingle({ id }, fields);

const updateAllResources = (store) => (filters, fields) =>
  store.updateAll(filters, fields);

export const baseResourceRepo = (name, store) => ({
  [`create${capitalize(name)}`]: createResource(store),
  [`read${capitalize(name)}`]: readResource(store),
  [`readAll${capitalize(plural(name))}`]: readAllResources(store),
  [`${name}Exists`]: resourceExists(store),
  [`update${capitalize(name)}`]: updateResource(store),
  [`updateAll${capitalize(plural(name))}`]: updateAllResources(store),
});
