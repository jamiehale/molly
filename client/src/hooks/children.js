import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useChildren = (parentId) =>
  J.transform(
    {
      children: J.prop('resources'),
      loadChildren: J.prop('loadResources'),
    },
    useResources(`/people/${parentId}/children`),
  );
