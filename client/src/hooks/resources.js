import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const useResources = (path) => {
  const { authorizedGet } = useApi();
  const [resources, setResources] = useState([]);

  const loadResources = useCallback(
    () => authorizedGet(path).then(setResources),
    [authorizedGet, path, setResources],
  );

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  return { resources, loadResources };
};
