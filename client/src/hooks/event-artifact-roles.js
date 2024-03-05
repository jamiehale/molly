import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useEventArtifactRoles = () =>
  J.transform(
    {
      eventArtifactRoles: J.prop('resources'),
      loadEventArtifactRoles: J.prop('loadResources'),
    },
    useResources('/event-artifact-roles'),
  );
