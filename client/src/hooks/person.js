import { useEffect, useState } from 'react';
import { useApi } from './api';

export const usePerson = (id) => {
  const { authorizedGet } = useApi();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    authorizedGet(`/people/${id}`).then(setPerson);
  }, [id, authorizedGet, setPerson]);

  return { person };
};
