import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const usePeople = () => {
  const { authorizedGet, authorizedPost } = useApi();

  const [people, setPeople] = useState([]);

  const loadPeople = useCallback(
    () => authorizedGet('/people').then(setPeople),
    [authorizedGet, setPeople],
  );

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const createPerson = useCallback(
    (givenNames, surname, genderId) =>
      authorizedPost('/people', {
        givenNames,
        surname,
        genderId,
      }).then((person) => {
        setPeople([...people, person]);
      }),
    [authorizedPost, people, setPeople],
  );

  return { people, createPerson, reloadPeople: loadPeople };
};
