import * as J from '../lib/jlib';
import { useResource } from './resource';

export const useCollection = (id) =>
  J.transform(
    {
      collection: J.prop('resource'),
      loadCollection: J.prop('loadResource'),
    },
    useResource('/collections', id),
  );
