import express from 'express';
import {
  HttpError,
  InternalError,
  ParameterError,
  UnauthorizedError,
  isInternalError,
  isMollyError,
  isParameterError,
  isUnauthorizedError,
} from './error';
import { plural, throwIfNil } from './util';
import { validResource, validate } from './validation';
import * as U from './util';

export const withUserId = async (context) => {
  if (!context.res.locals.userId) {
    throw new UnauthorizedError('Not authenticated');
  }
  context.userId = context.res.locals.userId;
  return context;
};

export const withQuery = (validateFn) => (context) =>
  validateFn({ scope: 'query', value: context.req.query }).then((query) => {
    context.query = query;
    return context;
  });

export const withParams = (validateFn) => (context) =>
  validateFn({ scope: 'params', value: context.req.params }).then((params) => {
    context.params = params;
    return context;
  });

export const withBody = (validateFn) => (context) =>
  validateFn({ scope: 'body', value: context.req.body }).then((body) => {
    context.body = body;
    return context;
  });

export const withContext = (fn) => async (req, res, next) =>
  fn({ req, res, next })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return next(httpErrorFromMollyError(err));
    });

export const withJsonResponse = (context) =>
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
  console.error(mollyError);
  return new HttpError(mollyError.message, 500);
};

export const withErrorHandling = (fn) => (context) => {
  fn(context).catch((err) => {
    return context.next(httpErrorFromMollyError(err));
  });
};

export const optionalField = (name, payload, fieldName = name) =>
  payload[name] === undefined ? {} : { [fieldName]: payload[name] };

export const resourceParams = (validateResourceIdFn, errorFn = undefined) => ({
  id: validResource(validateResourceIdFn, errorFn),
});

export const routes = (handlers) =>
  handlers.reduce((router, handler) => {
    handler(router);
    return router;
  }, express.Router());

const passThrough = (fn) => (context) => fn(context);

const invalidResourceErrorFn =
  (name) =>
  ({ field, value }) =>
    new ParameterError(`Invalid ${name} id '${value}' (${field})`);

export const getSingleResource =
  (path, validateParamsFn, readResourceFn) => (router) =>
    router.get(
      path,
      withContext(
        U.composeP(readResourceFn, withParams(validateParamsFn), withUserId),
      ),
    );

export const getAllResources =
  (path, validateQueryFn, readAllResourcesFn) => (router) =>
    router.get(
      path,
      withContext(
        U.composeP(readAllResourcesFn, withQuery(validateQueryFn), withUserId),
      ),
    );

export const postResource =
  (path, validateBodyFn, createResourceFn) => (router) =>
    router.post(
      path,
      withContext(
        U.composeP(createResourceFn, withBody(validateBodyFn), withUserId),
      ),
    );

export const patchResource =
  (path, validateParamsFn, validateBodyFn, updateResourceFn) => (router) =>
    router.patch(
      path,
      withContext(
        U.composeP(
          updateResourceFn,
          withBody(validateBodyFn),
          withParams(validateParamsFn),
          withUserId,
        ),
      ),
    );

// export const baseResourceRoutes = (
//   name,
//   validateResourceFn,
//   readResourceFn,
//   readAllResourcesFn,
//   postDescriptor,
//   createResourceFn,
//   patchDescriptor,
//   updateResourceFn,
//   extraFn = passThrough,
// ) => [
//   getSingleResource(name, validateResourceFn, readResourceFn, extraFn),
//   getAllResources(name, readAllResourcesFn, extraFn),
//   postResource(name, postDescriptor, createResourceFn, extraFn),
//   patchResource(
//     name,
//     validateResourceFn,
//     patchDescriptor,
//     updateResourceFn,
//     extraFn,
//   ),
// ];
