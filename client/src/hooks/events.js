import { useCallback, useEffect, useState } from 'react';
import { useApi } from './api';

export const useEvents = () => {
  const { authorizedGet, authorizedPost } = useApi();

  const [events, setEvents] = useState([]);

  const loadEvents = useCallback(
    () => authorizedGet('/events').then(setEvents),
    [authorizedGet, setEvents],
  );

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const createEvent = useCallback(
    (title, typeId, dateValue, locationId) =>
      authorizedPost('/events', {
        title,
        typeId,
        dateValue,
        locationId,
      }).then((event) => {
        setEvents([...events, event]);
      }),
    [authorizedPost, events, setEvents],
  );

  return { events, createEvent, reloadEvents: loadEvents };
};
