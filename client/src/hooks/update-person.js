import { useCallback } from 'react';
import { useUpdateResource } from './update-resource';

export const useUpdatePerson = (id) => {
  const { updateResource } = useUpdateResource('/people', id);

  const updatePerson = useCallback(
    (givenNames, surname, genderId) =>
      updateResource({ givenNames, surname, genderId }),
    [updateResource],
  );

  return { updatePerson };
};
