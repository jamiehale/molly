import { useCallback } from 'react';
import { useCreateResource } from './create-resource';

export const useCreateParent = (childId) => {
  const { createResource } = useCreateResource(`/people/${childId}/parents`);

  const createParent = useCallback(
    (parentId, parentRoleId) => createResource({ parentId, parentRoleId }),
    [createResource],
  );

  return { createParent };
};
