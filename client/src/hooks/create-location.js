import { useCallback } from 'react';
import { useCreateResource } from './create-resource';

export const useCreateLocation = () => {
  const { createResource } = useCreateResource('/locations');

  const createLocation = useCallback(
    (value) => createResource({ value }),
    [createResource],
  );

  return { createLocation };
};
