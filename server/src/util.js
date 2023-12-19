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

export const throwIfFalse = (eFn) => (v) => {
  if (!v) {
    throw eFn();
  }
  return v;
};

export const thunk =
  (f) =>
  (...args) =>
  () =>
    f(...args);

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
export const identityP = async (v) => v;

export const always = curry((v) => () => v);

export const ifElse = curry((condFn, trueFn, falseFn, v) =>
  condFn(v) ? trueFn(v) : falseFn(v),
);

export const isUndefined = (v) => v === undefined;

export const prop = curry((s, o) => o[s]);

export const eq = curry((expected, value) => value === expected);
export const gte = curry((limit, value) => value >= limit);

export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x);

export const composeM =
  (chainMethod) =>
  (...ms) =>
    ms.reduce((f, g) => (x) => g(x)[chainMethod](f));

export const composeP = composeM('then');

export const trace = (o) => {
  console.log(o, typeof o);
  return o;
};

export const toInt = (s) => parseInt(s, 10);

export const capitalize = (s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

export const plural = (s) => `${s}s`;

export const renameKeys = curry((keyMap, o) =>
  Object.keys(o).reduce((acc, key) => ({ ...acc, [keyMap[key]]: o[key] }), {}),
);

export const type = (val) =>
  val === null
    ? 'Null'
    : val === undefined
    ? 'Undefined'
    : Object.prototype.toString.call(val).slice(8, -1);

export const transform = curry((descriptor, o) =>
  Object.keys(descriptor).reduce(
    (acc, key) => ({ ...acc, [key]: descriptor[key](o) }),
    {},
  ),
);

export const map = curry((f, a) => a.map(f));
