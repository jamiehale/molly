import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useLocations = () =>
  J.transform(
    {
      locations: J.prop('resources'),
      loadLocations: J.prop('loadResources'),
    },
    useResources('/locations'),
  );
