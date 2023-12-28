import { useCallback } from 'react';
import { useApi } from './api';

export const usePeopleSearch = () => {
  const { authorizedGet } = useApi('http://localhost:3000/api', '12345');

  const searchForPeople = useCallback(
    (q) => authorizedGet(`/people?q=${q}`),
    [authorizedGet],
  );

  return {
    searchForPeople,
  };
};
