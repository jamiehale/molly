import { toInternalError } from '../error';
import * as U from '../util';

export const createResource =
  (store, fromModelFn, toModelFn) => (newResource) =>
    store
      .create(fromModelFn(newResource))
      .then(toModelFn)
      .catch(toInternalError);

export const readResource = (store, toModelFn) => (id) =>
  store.readSingle({ id }).then(toModelFn).catch(toInternalError);

export const readAllResources =
  (store, fromModelFn, toModelFn) =>
  (filters = {}) =>
    store
      .readAll(fromModelFn(filters))
      .then(U.map(toModelFn))
      .catch(toInternalError);

export const resourceExists = (store) => (id) =>
  store.exists({ id }).catch(toInternalError);

export const updateResource =
  (store, fromModelFn, toModelFn) => async (id, fields) =>
    store
      .updateSingle({ id }, fromModelFn(fields))
      .then(toModelFn)
      .catch(toInternalError);

export const updateAllResources =
  (store, fromModelFn, toModelFn) => async (filters, fields) =>
    store
      .updateAll(fromModelFn(filters), fromModelFn(fields))
      .then(U.map(toModelFn))
      .catch(toInternalError);
