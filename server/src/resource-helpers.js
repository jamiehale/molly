import { HttpError } from './error';
import { throwIfNil } from './util';
import { validate } from './validation';

export const withAuthentication = (fn) => async (context) => {
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

const withInitialContext = (fn) => (req, res, next) => fn({ req, res, next });

const withJsonResponse = (responseFn) => (context) =>
  responseFn(context)
    .then(throwIfNil(() => new HttpError('Invalid response')))
    .then((responseValue) => {
      context.res.json(responseValue);
    });

const withErrorHandling = (fn) => (context) => {
  fn(context).catch(context.next);
};

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
