import { useEffect, useState } from 'react';
import { useApi } from './api';

export const useGenders = () => {
  const { authorizedGet } = useApi();

  const [genders, setGenders] = useState([]);

  useEffect(() => {
    authorizedGet('/genders').then(setGenders);
  }, [authorizedGet, setGenders]);

  return { genders };
};
