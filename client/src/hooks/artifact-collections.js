import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const useArtifactCollections = () => {
  const { authorizedGet, authorizedPost } = useApi();

  const [artifactCollections, setArtifactCollections] = useState([]);

  const loadArtifactCollections = useCallback(
    () => authorizedGet('/artifact-collections').then(setArtifactCollections),
    [authorizedGet, setArtifactCollections],
  );

  useEffect(() => {
    loadArtifactCollections();
  }, [loadArtifactCollections]);

  const createArtifactCollection = useCallback(
    (title, shortName, description) =>
      authorizedPost('/artifact-collections', {
        title,
        shortName,
        description,
      }).then((artifactCollection) => {
        setArtifactCollections([...artifactCollections, artifactCollection]);
      }),
    [authorizedPost, artifactCollections, setArtifactCollections],
  );

  return {
    artifactCollections,
    createArtifactCollection,
    reloadArtifactCollections: loadArtifactCollections,
  };
};
