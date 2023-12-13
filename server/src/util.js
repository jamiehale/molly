export const firstRecord = (records) => records[0];

export const throwIfNil = (eFn) => (v) => {
  if (!v) {
    throw eFn();
  }
  return v;
};

export const throwIfEmpty = (eFn) => (v) => {
  if (Array.isArray(v) && v.length === 0) {
    throw eFn();
  }
  return v;
};

export const curry = (func) => {
  const curried = (...args) => {
    if (args.length >= func.length) {
      return func.apply(undefined, args);
    } else {
      return function (...args2) {
        return curried.apply(undefined, args.concat(args2));
      };
    }
  };
  return curried;
};

export const identity = (v) => v;
export const always = curry((v) => () => v);

export const ifElse = curry((condFn, trueFn, falseFn, v) =>
  condFn(v) ? trueFn(v) : falseFn(v),
);

export const isUndefined = (v) => v === undefined;
