import * as J from '../lib/jlib';
import { useResource } from './resource';

export const usePerson = (id) =>
  J.transform(
    {
      person: J.prop('resource'),
      loadPerson: J.prop('loadResource'),
    },
    useResource('/people', id),
  );
