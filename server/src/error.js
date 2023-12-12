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

export class NotFoundError extends MollyError {
  constructor(message) {
    super(message, 'notFound');
  }
}

export const isNotFoundError = (e) =>
  isMollyError(e) && e.errorType === 'notFound';