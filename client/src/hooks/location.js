import * as J from '../lib/jlib';
import { useResource } from './resource';

export const useLocation = (id) =>
  J.transform(
    {
      location: J.prop('resource'),
      loadLocation: J.prop('loadResource'),
    },
    useResource('/locations', id),
  );
