import * as J from '../jlib.js';

export const createResource =
  (store, fromModelFn, toModelFn) => (newResource) =>
    store.create(fromModelFn(newResource)).then(toModelFn);

export const readResource = (store, toModelFn) => (id) =>
  store.readSingle({ id }).then(toModelFn);

export const readAllResources =
  (store, fromModelFn, toModelFn) =>
  (filters = {}) =>
    store.readAll(fromModelFn(filters)).then(J.map(toModelFn));

export const resourceExists = (store) => (id) => store.exists({ id });

export const updateResource =
  (store, fromModelFn, toModelFn) => async (id, fields) =>
    store.updateSingle({ id }, fromModelFn(fields)).then(toModelFn);

export const updateAllResources =
  (store, fromModelFn, toModelFn) => async (filters, fields) =>
    store
      .updateAll(fromModelFn(filters), fromModelFn(fields))
      .then(J.map(toModelFn));
