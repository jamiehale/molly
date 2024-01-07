import * as J from '../lib/jlib';
import { useResources } from './resources';

export const useArtifacts = () =>
  J.transform(
    {
      artifacts: J.prop('resources'),
      loadArtifacts: J.prop('loadResources'),
    },
    useResources('/artifacts'),
  );
