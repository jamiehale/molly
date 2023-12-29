import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const useParents = (childId) => {
  const { authorizedGet, authorizedPost } = useApi();

  const [parents, setParents] = useState([]);

  useEffect(() => {
    authorizedGet(`/people/${childId}/parents`).then(setParents);
  }, [childId, authorizedGet, setParents]);

  const addParent = useCallback(
    (parentId, parentRoleId) =>
      authorizedPost(`/people/${childId}/parents`, { parentId, parentRoleId }),
    [childId, authorizedPost],
  );

  const reloadParents = useCallback(
    () => authorizedGet(`/people/${childId}/parents`).then(setParents),
    [childId, authorizedGet, setParents],
  );

  return { parents, reloadParents, addParent };
};
