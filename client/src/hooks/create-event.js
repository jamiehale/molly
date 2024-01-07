import { useCreateResource } from './create-resource';
import { useCallback } from 'react';

export const useCreateEvent = () => {
  const { createResource } = useCreateResource('/events');

  const createEvent = useCallback(
    (title, typeId, dateValue, locationId) =>
      createResource({ title, typeId, dateValue, locationId }),
    [createResource],
  );

  return { createEvent };
};
