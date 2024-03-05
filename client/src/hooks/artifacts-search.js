import { useCallback } from 'react';
import { useApi } from './api';

export const useArtifactsSearch = () => {
  const { authorizedGet } = useApi();

  const searchForArtifacts = useCallback(
    (q) => authorizedGet(`/artifacts?q=${q}`),
    [authorizedGet],
  );

  return {
    searchForArtifacts,
  };
};
