import { useCallback, useEffect, useMemo, useState } from 'react';

export const useChildren = (parentId, authorizedGet, authorizedPost) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    authorizedGet(`/people/${parentId}/children`).then(setChildren);
  }, [parentId, authorizedGet, setChildren]);

  const addChild = useCallback(
    (childId, parentRoleId) =>
      authorizedPost(`/people/${parentId}/children`, { childId, parentRoleId }),
    [parentId, authorizedPost],
  );

  const reloadChildren = useCallback(() => {
    authorizedGet(`/people/${parentId}/children`).then(setChildren);
  }, [parentId, authorizedGet, setChildren]);

  return useMemo(
    () => ({ children, reloadChildren, addChild }),
    [children, reloadChildren, addChild],
  );
};
