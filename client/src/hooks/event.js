import { useCallback, useState } from 'react';
import { useApi } from './api';

export const useEvent = (id) => {
  const { authorizedGet, authorizedPatch } = useApi();
  const [event, setEvent] = useState(null);

  const loadEvent = useCallback(() => {
    authorizedGet(`/events/${id}`).then(setEvent);
  }, [id, authorizedGet, setEvent]);

  const updateEvent = useCallback(
    (title, typeId, dateValue, locationId) =>
      authorizedPatch(`/events/${id}`, {
        title,
        typeId,
        dateValue,
        locationId,
      }).then(setEvent),
    [id, authorizedPatch, setEvent],
  );

  return { event, reload: loadEvent, updateEvent };
};
