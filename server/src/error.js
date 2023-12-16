export class HttpError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export const isHttpError = (e) => e.status !== undefined;

export class MollyError extends Error {
  constructor(message, errorType = 'unspecified') {
    super(message);
    this.errorType = errorType;
  }
}

export const isMollyError = (e) => e.errorType !== undefined;

export class UnauthorizedError extends MollyError {
  constructor(message) {
    super(message, 'unauthorized');
  }
}

export const isUnauthorizedError = (e) =>
  isMollyError(e) && e.errorType === 'unauthorized';

export class NotFoundError extends MollyError {
  constructor(message) {
    super(message, 'notFound');
  }
}

export const isNotFoundError = (e) =>
  isMollyError(e) && e.errorType === 'notFound';

export const toInternalError = (err) => {
  throw new InternalError(err.message);
};

export class InternalError extends MollyError {
  constructor(message) {
    super(message, 'internal');
  }
}

export const isInternalError = (e) =>
  isMollyError(e) && e.errorType === 'internal';

export class ParameterError extends MollyError {
  constructor(message) {
    super(message, 'parameter');
  }
}

export const isParameterError = (e) =>
  isMollyError(e) && e.errorType === 'parameter';
