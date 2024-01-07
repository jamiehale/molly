import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const useResource = (path, id) => {
  const { authorizedGet } = useApi();
  const [resource, setResource] = useState(null);

  const loadResource = useCallback(
    () => authorizedGet(`${path}/${id}`).then(setResource),
    [authorizedGet, path, id, setResource],
  );

  useEffect(() => {
    loadResource();
  }, [loadResource]);

  return { resource, loadResource };
};
