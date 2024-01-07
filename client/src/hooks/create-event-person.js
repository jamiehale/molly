import { useCreateResource } from './create-resource';
import { useCallback } from 'react';

export const useCreateEventPerson = (eventId) => {
  const { createResource } = useCreateResource(`/events/${eventId}/people`);

  const createEventPerson = useCallback(
    (personId, roleId) => createResource({ eventId, personId, roleId }),
    [eventId, createResource],
  );

  return { createEventPerson };
};
