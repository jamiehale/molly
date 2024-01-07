import { useCallback } from 'react';
import { useUpdateResource } from './update-resource';

export const useUpdateArtifact = (id) => {
  const { updateResource } = useUpdateResource('/artifacts', id);

  const updateArtifact = useCallback(
    (title, description, typeId, sourceId, collectionId) =>
      updateResource({ title, description, typeId, sourceId, collectionId }),
    [updateResource],
  );

  return { updateArtifact };
};
