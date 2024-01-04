import { useCallback, useState } from 'react';
import { useApi } from './api';

export const useArtifactCollection = (id) => {
  const { authorizedGet, authorizedPatch } = useApi();
  const [artifactCollection, setArtifactCollection] = useState(null);

  const loadArtifactCollection = useCallback(() => {
    authorizedGet(`/artifact-collections/${id}`).then(setArtifactCollection);
  }, [id, authorizedGet, setArtifactCollection]);

  const updateArtifactCollection = useCallback(
    (title, shortName, description) =>
      authorizedPatch(`/artifact-collections/${id}`, {
        title,
        shortName,
        description,
      }).then(setArtifactCollection),
    [id, authorizedPatch, setArtifactCollection],
  );

  return {
    artifactCollection,
    reload: loadArtifactCollection,
    updateArtifactCollection,
  };
};
