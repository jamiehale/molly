import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const useArtifacts = () => {
  const { authorizedGet, authorizedPost } = useApi();

  const [artifacts, setArtifacts] = useState([]);

  const loadArtifacts = useCallback(
    () => authorizedGet('/artifacts').then(setArtifacts),
    [authorizedGet, setArtifacts],
  );

  useEffect(() => {
    loadArtifacts();
  }, [loadArtifacts]);

  const createArtifact = useCallback(
    (title, description, typeId, sourceId, collectionId) =>
      authorizedPost('/artifacts', {
        title,
        description,
        typeId,
        sourceId,
        collectionId,
      }).then((artifact) => {
        setArtifacts([...artifacts, artifact]);
      }),
    [authorizedPost, artifacts, setArtifacts],
  );

  return {
    artifacts,
    createArtifact,
    reloadArtifacts: loadArtifacts,
  };
};
