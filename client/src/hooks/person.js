import { useEffect, useMemo, useState } from 'react';
import { useApi } from './api';

export const usePerson = (id) => {
  const { authorizedGet } = useApi('http://localhost:3000/api', '12345');
  const [person, setPerson] = useState(null);

  useEffect(() => {
    authorizedGet(`/people/${id}`).then(setPerson);
  }, [id, authorizedGet, setPerson]);

  return useMemo(() => ({ person }), [person]);
};
