import { useEffect, useState } from 'react';
import { useApi } from './api';

export const useGenders = () => {
  const { authorizedGet } = useApi('http://localhost:3000/api', '12345');

  const [genders, setGenders] = useState([]);

  useEffect(() => {
    authorizedGet('/genders').then(setGenders);
  }, []);

  return { genders };
};
