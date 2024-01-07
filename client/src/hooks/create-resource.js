import { useCallback } from 'react';
import { useApi } from './api';

export const useCreateResource = (path) => {
  const { authorizedPost } = useApi();

  const createResource = useCallback(
    (body) => authorizedPost(path, body),
    [authorizedPost, path],
  );

  return { createResource };
};
