import { useCreateResource } from './create-resource';
import { useCallback } from 'react';

export const useCreateCollection = () => {
  const { createResource } = useCreateResource('/collections');

  const createCollection = useCallback(
    (title, shortName, description) =>
      createResource({ title, shortName, description }),
    [createResource],
  );

  return { createCollection };
};
