import { useCallback } from 'react';
import { useApi } from './api';

export const usePeopleSearch = () => {
  const { authorizedGet } = useApi();

  const searchForPeople = useCallback(
    (q) => authorizedGet(`/people?q=${q}`),
    [authorizedGet],
  );

  return {
    searchForPeople,
  };
};
