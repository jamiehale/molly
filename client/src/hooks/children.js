import { useEffect, useMemo, useState } from 'react';

export const useChildren = (parentId, authorizedGet) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    authorizedGet(`/people/${parentId}/children`).then(setChildren);
  }, [parentId, authorizedGet, setChildren]);

  return useMemo(() => ({ children }), [children]);
};
