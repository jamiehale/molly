import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useCollections = () =>
  J.transform(
    {
      collections: J.prop('resources'),
      loadCollections: J.prop('loadResources'),
    },
    useResources('/collections'),
  );
