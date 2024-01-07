import * as J from '../lib/jlib';
import { useResource } from './resource';

export const useEvent = (id) =>
  J.transform(
    {
      event: J.prop('resource'),
      loadEvent: J.prop('loadResource'),
    },
    useResource('/events', id),
  );
