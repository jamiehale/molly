import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useParents = (childId) =>
  J.transform(
    {
      parents: J.prop('resources'),
      loadParents: J.prop('loadResources'),
    },
    useResources(`/people/${childId}/parents`),
  );
