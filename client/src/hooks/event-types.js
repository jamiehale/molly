import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useEventTypes = () =>
  J.transform(
    {
      eventTypes: J.prop('resources'),
      loadEventTypes: J.prop('loadResources'),
    },
    useResources('/event-types'),
  );
