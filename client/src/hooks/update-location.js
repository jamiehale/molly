import { useCallback } from 'react';
import { useUpdateResource } from './update-resource';

export const useUpdateLocation = (id) => {
  const { updateResource } = useUpdateResource('/locations', id);

  const updateLocation = useCallback(
    (value) => updateResource({ value }),
    [updateResource],
  );

  return { updateLocation };
};
