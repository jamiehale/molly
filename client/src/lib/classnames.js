const expand = (a) => {
  if (a === undefined) {
    return [];
  }
  return a.split(' ');
};

export const classnames = (...args) =>
  args.reduce((acc, arg) => [...acc, ...expand(arg)], []).join(' ');
