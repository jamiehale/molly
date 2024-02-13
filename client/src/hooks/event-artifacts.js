import { useResources } from './resources';
import * as J from '../lib/jlib';

export const useEventArtifacts = (id) =>
  J.transform(
    {
      eventArtifacts: J.prop('resources'),
      loadEventArtifacts: J.prop('loadResources'),
    },
    useResources(`/events/${id}/artifacts`),
  );
