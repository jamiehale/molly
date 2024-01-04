import { useEffect, useState } from 'react';
import { useApi } from './api';

export const useArtifactSources = () => {
  const { authorizedGet } = useApi();

  const [artifactSources, setArtifactSources] = useState([]);

  useEffect(() => {
    authorizedGet('/artifact-sources').then(setArtifactSources);
  }, [authorizedGet, setArtifactSources]);

  return { artifactSources };
};
