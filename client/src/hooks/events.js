import { useResources } from './resources';
import * as J from '../lib/jlib';

export const useEvents = () =>
  J.transform(
    {
      events: J.prop('resources'),
      loadEvents: J.prop('loadResources'),
    },
    useResources('/events'),
  );
