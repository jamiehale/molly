import { useEffect, useMemo, useState } from 'react';

export const usePerson = (id, authorizedGet) => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    authorizedGet(`/people/${id}`).then(setPerson);
  }, [id, authorizedGet, setPerson]);

  return useMemo(() => ({ person }), [person]);
};
