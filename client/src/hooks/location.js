import { useCallback, useState } from 'react';
import { useApi } from './api';

export const useLocation = (id) => {
  const { authorizedGet, authorizedPatch } = useApi();
  const [location, setLocation] = useState(null);

  const loadLocation = useCallback(() => {
    authorizedGet(`/locations/${id}`).then(setLocation);
  }, [id, authorizedGet, setLocation]);

  const updateLocation = useCallback(
    (value) => authorizedPatch(`/locations/${id}`, { value }).then(setLocation),
    [id, authorizedPatch, setLocation],
  );

  return {
    location,
    reload: loadLocation,
    updateLocation,
  };
};
