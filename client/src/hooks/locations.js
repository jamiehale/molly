import { useEffect, useState } from 'react';
import { useApi } from './api';

export const useLocations = () => {
  const { authorizedGet } = useApi();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    authorizedGet('/locations').then(setLocations);
  }, [authorizedGet, setLocations]);

  return { locations };
};
