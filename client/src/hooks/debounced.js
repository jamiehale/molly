import { useEffect, useState } from 'react';

export const useDebounced = (value, timeout = 200) => {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => {
      clearTimeout(t);
    };
  }, [value, timeout]);

  return debouncedValue;
};
