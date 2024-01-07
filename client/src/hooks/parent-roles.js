import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useParentRoles = () =>
  J.transform(
    {
      parentRoles: J.prop('resources'),
      loadParentRoles: J.prop('loadResources'),
    },
    useResources('/parent-roles'),
  );
