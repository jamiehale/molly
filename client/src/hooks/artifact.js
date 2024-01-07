import { useResource } from './resource';
import * as J from '../lib/jlib';

export const useArtifact = (id) =>
  J.transform(
    {
      artifact: J.prop('resource'),
      loadArtifact: J.prop('loadResource'),
    },
    useResource('/artifacts', id),
  );
