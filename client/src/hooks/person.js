import { useCallback, useState } from 'react';
import { useApi } from './api';

export const usePerson = (id) => {
  const { authorizedGet, authorizedPatch } = useApi();
  const [person, setPerson] = useState(null);

  const loadPerson = useCallback(() => {
    authorizedGet(`/people/${id}`).then(setPerson);
  }, [id, authorizedGet, setPerson]);

  const updatePerson = useCallback(
    (givenNames, surname, genderId) =>
      authorizedPatch(`/people/${id}`, {
        givenNames,
        surname,
        genderId,
      }).then(setPerson),
    [id, authorizedPatch, setPerson],
  );

  return { person, reload: loadPerson, updatePerson };
};
