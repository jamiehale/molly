import { useCallback } from 'react';

export const usePeopleSearch = (authorizedGet) => {
  const searchForPeople = useCallback(
    (q) => authorizedGet(`/people?q=${q}`),
    [authorizedGet],
  );

  return {
    searchForPeople,
  };
};
