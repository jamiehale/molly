import * as J from '../lib/jlib';
import { useResources } from './resources';

export const usePeople = () =>
  J.transform(
    {
      people: J.prop('resources'),
      loadPeople: J.prop('loadResources'),
    },
    useResources('/people'),
  );
