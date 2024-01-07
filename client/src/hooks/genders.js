import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useGenders = () =>
  J.transform(
    {
      genders: J.prop('resources'),
      loadGenders: J.prop('loadResources'),
    },
    useResources('/genders'),
  );
