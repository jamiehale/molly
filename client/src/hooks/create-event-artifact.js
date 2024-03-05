import { useCreateResource } from './create-resource';
import { useCallback } from 'react';

export const useCreateEventArtifact = (eventId) => {
  const { createResource } = useCreateResource(`/events/${eventId}/artifacts`);

  const createEventArtifact = useCallback(
    (artifactId, roleId) => createResource({ eventId, artifactId, roleId }),
    [eventId, createResource],
  );

  return { createEventArtifact };
};
