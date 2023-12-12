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
