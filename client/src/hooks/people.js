import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApi } from './api';

export const usePeople = () => {
  const { authorizedGet, authorizedPost } = useApi(
    'http://localhost:3000/api',
    '12345',
  );

  const [people, setPeople] = useState([]);

  useEffect(() => {
    authorizedGet('/people').then(setPeople);
  }, [authorizedGet, setPeople]);

  const createPerson = useCallback(
    (givenNames, surname, genderId) => {
      authorizedPost('/people', {
        givenNames,
        surname,
        genderId,
      }).then((person) => {
        setPeople([...people, person]);
      });
    },
    [authorizedPost, people, setPeople],
  );

  return useMemo(() => ({ people, createPerson }), [people, createPerson]);
};
