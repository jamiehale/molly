import { useCallback } from 'react';
import { useCreateResource } from './create-resource';

export const useCreateArtifact = () => {
  const { createResource } = useCreateResource('/artifacts');

  const createArtifact = useCallback(
    (title, description, typeId, sourceId, collectionId) =>
      createResource({ title, description, typeId, sourceId, collectionId }),
    [createResource],
  );

  return { createArtifact };
};
