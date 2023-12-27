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

export const prop = curry((s, o) => o[s]);
