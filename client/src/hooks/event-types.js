import { useEffect, useState } from 'react';
import { useApi } from './api';

export const useEventTypes = () => {
  const { authorizedGet } = useApi();

  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    authorizedGet('/event-types').then(setEventTypes);
  }, [authorizedGet, setEventTypes]);

  return { eventTypes };
};
