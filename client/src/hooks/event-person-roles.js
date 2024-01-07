import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useEventPersonRoles = () =>
  J.transform(
    {
      eventPersonRoles: J.prop('resources'),
      loadEventPersonRoles: J.prop('loadResources'),
    },
    useResources('/event-person-roles'),
  );
