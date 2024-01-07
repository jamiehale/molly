import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useArtifactTypes = () =>
  J.transform(
    {
      artifactTypes: J.prop('resources'),
      loadArtifactTypes: J.prop('loadResources'),
    },
    useResources('/artifact-types'),
  );
