import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as J from '../../jlib';

const fromModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
});

const toModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
});

export const createArtifactSourceRepo = ({ artifactSourceStore }) => ({
  createArtifactSource: createResource(artifactSourceStore, fromModel, toModel),
  readArtifactSource: readResource(artifactSourceStore, toModel),
  readAllArtifactSources: readAllResources(
    artifactSourceStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactSourceExists: resourceExists(artifactSourceStore),
  updateArtifactSource: updateResource(artifactSourceStore, fromModel, toModel),
  updateAllArtifactSources: updateAllResources(
    artifactSourceStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
