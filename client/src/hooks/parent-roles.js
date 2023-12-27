import { useEffect, useState } from 'react';

export const useParentRoles = (authorizedGet) => {
  const [parentRoles, setParentRoles] = useState([]);

  useEffect(() => {
    authorizedGet('/parent-roles').then(setParentRoles);
  }, []);

  return { parentRoles };
};
