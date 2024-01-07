import { useResources } from './resources';
import * as J from '../lib/jlib';

export const useEventPeople = (id) =>
  J.transform(
    {
      eventPeople: J.prop('resources'),
      loadEventPeople: J.prop('loadResources'),
    },
    useResources(`/events/${id}/people`),
  );
