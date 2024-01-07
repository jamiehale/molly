import { useEffect, useRef } from 'react';

export const useAutofocus = () => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  return ref;
};
