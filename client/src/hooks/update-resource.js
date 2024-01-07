import { useCallback } from 'react';
import { useApi } from './api';

export const useUpdateResource = (path, id) => {
  const { authorizedPatch } = useApi();

  const updateResource = useCallback(
    (body) => authorizedPatch(`${path}/${id}`, body),
    [authorizedPatch, path, id],
  );

  return { updateResource };
};
