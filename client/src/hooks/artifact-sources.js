import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useArtifactSources = () =>
  J.transform(
    {
      artifactSources: J.prop('resources'),
      loadArtifactSources: J.prop('loadResources'),
    },
    useResources('/artifact-sources'),
  );
