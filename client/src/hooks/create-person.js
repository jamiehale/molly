import { useCallback } from 'react';
import { useCreateResource } from './create-resource';

export const useCreatePerson = () => {
  const { createResource } = useCreateResource('/people');

  const createPerson = useCallback(
    (givenNames, surname, genderId) =>
      createResource({ givenNames, surname, genderId }),
    [createResource],
  );

  return { createPerson };
};
