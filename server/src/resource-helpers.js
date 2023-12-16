import express from 'express';
import {
  HttpError,
  InternalError,
  UnauthorizedError,
  isInternalError,
  isMollyError,
  isParameterError,
  isUnauthorizedError,
} from './error';
import { plural, throwIfNil } from './util';
import { validResource, validate } from './validation';

export const withUserId = (fn) => async (context) => {
  if (!context.res.locals.userId) {
    throw new UnauthorizedError('Not authenticated');
  }
  context.userId = context.res.locals.userId;
  return fn(context);
};

export const withParams = (descriptor, fn) => (context) =>
  validate(descriptor, context.req.params).then((params) => {
    context.params = params;
    return fn(context);
  });

export const withPayload = (descriptor, fn) => (context) =>
  validate(descriptor, context.req.body).then((payload) => {
    context.payload = payload;
    return fn(context);
  });

export const withInitialContext = (fn) => (req, res, next) =>
  fn({ req, res, next });

export const withJsonResponse = (fn) => (context) =>
  fn(context)
    .then(throwIfNil(() => new InternalError('Invalid response')))
    .then((responseValue) => {
      context.res.json(responseValue);
    });

const httpErrorFromMollyError = (mollyError) => {
  if (isUnauthorizedError(mollyError)) {
    return new HttpError(mollyError.message, 401);
  }
  if (isInternalError(mollyError)) {
    console.error(mollyError);
    return new HttpError('Internal error', 500);
  }
  if (isParameterError(mollyError)) {
    return new HttpError(mollyError.message, 400);
  }
  return new HttpError(mollyError.message, 500);
};

export const withErrorHandling = (fn) => (context) => {
  fn(context).catch((err) => {
    return context.next(httpErrorFromMollyError(err));
  });
};

export const optionalField = (name, payload, fieldName = name) =>
  payload[name] === undefined ? {} : { [fieldName]: payload[name] };

export const resourceParams = (validateResourceIdFn) => ({
  id: validResource(validateResourceIdFn),
});

export const routes = (handlers) =>
  handlers.reduce((router, handler) => {
    handler(router);
    return router;
  }, express.Router());

const passThrough = (fn) => (context) => fn(context);

const getSingleResource =
  (name, validateResourceFn, readResourceFn, extraFn = passThrough) =>
  (router) =>
    router.get(
      `/${plural(name)}/:id`,
      withInitialContext(
        withErrorHandling(
          extraFn(
            withJsonResponse(
              withParams(resourceParams(validateResourceFn), readResourceFn),
            ),
          ),
        ),
      ),
    );

const getAllResources =
  (name, readAllResourcesFn, extraFn = passThrough) =>
  (router) =>
    router.get(
      `/${plural(name)}`,
      withInitialContext(
        withErrorHandling(extraFn(withJsonResponse(readAllResourcesFn))),
      ),
    );

const postResource =
  (name, descriptor, createResourceFn, extraFn = passThrough) =>
  (router) =>
    router.post(
      `/${plural(name)}`,
      withInitialContext(
        withErrorHandling(
          extraFn(
            withJsonResponse(
              withUserId(withPayload(descriptor, createResourceFn)),
            ),
          ),
        ),
      ),
    );

const patchResource =
  (
    name,
    validateResourceFn,
    descriptor,
    updateResourceFn,
    extraFn = passThrough,
  ) =>
  (router) =>
    router.patch(
      `/${plural(name)}/:id`,
      withInitialContext(
        withErrorHandling(
          extraFn(
            withJsonResponse(
              withParams(
                resourceParams(validateResourceFn),
                withPayload(descriptor, updateResourceFn),
              ),
            ),
          ),
        ),
      ),
    );

export const baseResourceRoutes = (
  name,
  validateResourceFn,
  readResourceFn,
  readAllResourcesFn,
  postDescriptor,
  createResourceFn,
  patchDescriptor,
  updateResourceFn,
  extraFn = passThrough,
) => [
  getSingleResource(name, validateResourceFn, readResourceFn, extraFn),
  getAllResources(name, readAllResourcesFn, extraFn),
  postResource(name, postDescriptor, createResourceFn, extraFn),
  patchResource(
    name,
    validateResourceFn,
    patchDescriptor,
    updateResourceFn,
    extraFn,
  ),
];
