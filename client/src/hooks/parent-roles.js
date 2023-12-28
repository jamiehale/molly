import { useEffect, useState } from 'react';
import { useApi } from './api';

export const useParentRoles = () => {
  const { authorizedGet } = useApi('http://localhost:3000/api', '12345');

  const [parentRoles, setParentRoles] = useState([]);

  useEffect(() => {
    authorizedGet('/parent-roles').then(setParentRoles);
  }, [authorizedGet, setParentRoles]);

  return { parentRoles };
};
