import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const useLocations = () => {
  const { authorizedGet, authorizedPost } = useApi();

  const [locations, setLocations] = useState([]);

  const loadLocations = useCallback(
    () => authorizedGet('/locations').then(setLocations),
    [authorizedGet, setLocations],
  );

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  const createLocation = useCallback(
    (value) =>
      authorizedPost('/locations', { value }).then((event) => {
        setLocations([...locations, event]);
      }),
    [authorizedPost, locations, setLocations],
  );

  return {
    locations,
    createLocation,
    reloadLocations: loadLocations,
  };
};
