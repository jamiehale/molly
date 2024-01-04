import { useCallback, useState } from 'react';
import { useApi } from './api';

export const useArtifact = (id) => {
  const { authorizedGet, authorizedPatch } = useApi();
  const [artifact, setArtifact] = useState(null);

  const loadArtifact = useCallback(() => {
    authorizedGet(`/artifacts/${id}`).then(setArtifact);
  }, [id, authorizedGet, setArtifact]);

  const updateArtifact = useCallback(
    (title, description, typeId, sourceId, collectionId) =>
      authorizedPatch(`/artifacts/${id}`, {
        title,
        description,
        typeId,
        sourceId,
        collectionId,
      }).then(setArtifact),
    [id, authorizedPatch, setArtifact],
  );

  return { artifact, reload: loadArtifact, updateArtifact };
};
