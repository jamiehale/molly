import { useCallback } from 'react';
import { useUpdateResource } from './update-resource';

export const useUpdateCollection = (id) => {
  const { updateResource } = useUpdateResource('/collections', id);

  const updateCollection = useCallback(
    (title, shortName, description) =>
      updateResource({ title, shortName, description }),
    [updateResource],
  );

  return { updateCollection };
};
