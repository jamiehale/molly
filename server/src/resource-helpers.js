import express from 'express';
import {
  HttpError,
  InternalError,
  UnauthorizedError,
  isInternalError,
  isParameterError,
  isUnauthorizedError,
} from './error';
import * as J from './jlib';
import * as V from './validation';

const withUserId = async (context) => {
  if (!context.res.locals.userId) {
    throw new UnauthorizedError('Not authenticated');
  }
  context.userId = context.res.locals.userId;
  return context;
};

const withQuery = (validateFn) => (context) =>
  validateFn({ scope: 'query', value: context.req.query }).then((query) => {
    context.query = query;
    return context;
  });

const withParams = (validateFn) => (context) =>
  validateFn({ scope: 'params', value: context.req.params }).then((params) => {
    context.params = params;
    return context;
  });

const withBody = (validateFn) => (context) =>
  validateFn({ scope: 'body', value: context.req.body }).then((body) => {
    context.body = body;
    return context;
  });

const withContext = (fn) => async (req, res, next) =>
  fn({ req, res, next })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return next(httpErrorFromMollyError(err));
    });

const withJsonResponse = (context) =>
  fn(context)
    .then(J.throwIfNil(() => new InternalError('Invalid response')))
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

const withErrorHandling = (fn) => (context) => {
  fn(context).catch((err) => {
    return context.next(httpErrorFromMollyError(err));
  });
};

export const routes = (handlers) =>
  handlers.reduce((router, handler) => {
    handler(router);
    return router;
  }, express.Router());

const resourceParams = (validArtifactCollectionFn) =>
  V.object({
    id: V.and(
      V.required(),
      V.isNotNull(),
      V.validResource(validArtifactCollectionFn),
    ),
  });

export const getSingleResource =
  (path, validateResourceIdFn, readResourceFn) => (router) =>
    router.get(
      path,
      withContext(
        J.composeP(
          readResourceFn,
          withParams(resourceParams(validateResourceIdFn)),
          withUserId,
        ),
      ),
    );

export const getAllResources =
  (path, validateQueryFn, readAllResourcesFn) => (router) =>
    router.get(
      path,
      withContext(
        J.composeP(readAllResourcesFn, withQuery(validateQueryFn), withUserId),
      ),
    );

export const postResource =
  (path, validateBodyFn, createResourceFn) => (router) =>
    router.post(
      path,
      withContext(
        J.composeP(createResourceFn, withBody(validateBodyFn), withUserId),
      ),
    );

export const patchResource =
  (path, validateResourceIdFn, validateBodyFn, updateResourceFn) => (router) =>
    router.patch(
      path,
      withContext(
        J.composeP(
          updateResourceFn,
          withBody(validateBodyFn),
          withParams(resourceParams(validateResourceIdFn)),
          withUserId,
        ),
      ),
    );

export const getAllChildResources =
  (path, validateResourceFn, readAllResourcesFn) => (router) =>
    router.get(
      path,
      withContext(
        J.composeP(
          readAllResourcesFn,
          withParams(resourceParams(validateResourceFn)),
          withUserId,
        ),
      ),
    );

export const postChildResource =
  (path, validateResourceFn, validateBodyFn, createResourceFn) => (router) =>
    router.post(
      path,
      withContext(
        J.composeP(
          createResourceFn,
          withBody(validateBodyFn),
          withParams(resourceParams(validateResourceFn)),
          withUserId,
        ),
      ),
    );
