import { useCallback } from 'react';
import { useCreateResource } from './create-resource';

export const useCreateChild = (parentId) => {
  const { createResource } = useCreateResource(`/people/${parentId}/children`);

  const createChild = useCallback(
    (childId, parentRoleId) => createResource({ childId, parentRoleId }),
    [createResource],
  );

  return { createChild };
};
