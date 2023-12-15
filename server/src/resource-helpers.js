import express from 'express';
import { HttpError } from './error';
import { curry, throwIfNil } from './util';
import { validResource, validate } from './validation';

export const withUserId = (fn) => async (context) => {
  if (!context.res.locals.userId) {
    throw new Error('Not authenticated');
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

export const withJsonResponse = (responseFn) => (context) =>
  responseFn(context)
    .then(throwIfNil(() => new HttpError('Invalid response')))
    .then((responseValue) => {
      context.res.json(responseValue);
    });

export const withErrorHandling = (fn) => (context) => {
  fn(context).catch((err) => {
    return context.next(err);
  });
};

export const optionalField = (name, payload, fieldName = name) =>
  payload[name] === undefined ? {} : { [fieldName]: payload[name] };

export const get = (router, path, fn, ...middleware) => {
  router.get(
    path,
    ...middleware,
    withInitialContext(withErrorHandling(withJsonResponse(fn))),
  );
};

export const post = (router, path, fn, ...middleware) => {
  router.post(
    path,
    ...middleware,
    withInitialContext(withErrorHandling(withJsonResponse(fn))),
  );
};

export const patch = (router, path, fn, ...middleware) => {
  router.patch(
    path,
    ...middleware,
    withInitialContext(withErrorHandling(withJsonResponse(fn))),
  );
};

export const resourceParams = (validateResourceIdFn) => ({
  id: validResource(validateResourceIdFn),
});

export const getAllResources = curry((path, actionFn, router) =>
  router.get(
    path,
    withInitialContext(withErrorHandling(withJsonResponse(actionFn))),
  ),
);

export const getSingleResource = curry(
  (path, validateResourceIdFn, actionFn, router) =>
    router.get(
      `${path}/:id`,
      withInitialContext(
        withErrorHandling(
          withJsonResponse(
            withParams(resourceParams(validateResourceIdFn), (context) =>
              actionFn(context.params.id),
            ),
          ),
        ),
      ),
    ),
);

export const postResource = curry((path, payload, actionFn, router) =>
  router.post(
    path,
    withInitialContext(
      withErrorHandling(
        withJsonResponse(withUserId(withPayload(payload, () => actionFn()))),
      ),
    ),
  ),
);

export const patchResource = curry(
  (path, validateResourceIdFn, payload, actionFn, router) =>
    router.patch(
      `${path}/:id`,
      withInitialContext(
        withErrorHandling(
          withJsonResponse(
            withParams(
              resourceParams(validateResourceIdFn),
              withPayload(payload, (context) =>
                actionFn(context.params.id, context.payload),
              ),
            ),
          ),
        ),
      ),
    ),
);

export const routes = (a) =>
  a.reduce((router, r) => {
    r(router);
    return router;
  }, express.Router());
