import { useEffect, useState } from 'react';
import { useApi } from './api';

export const useArtifactTypes = () => {
  const { authorizedGet } = useApi();

  const [artifactTypes, setArtifactTypes] = useState([]);

  useEffect(() => {
    authorizedGet('/artifact-types').then(setArtifactTypes);
  }, [authorizedGet, setArtifactTypes]);

  return { artifactTypes };
};
