import { useEffect } from 'react';

export const useAutorun = (f) => {
  useEffect(() => {
    f();
  }, [f]);
};
