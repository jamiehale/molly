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

export const createArtifactSourcesRepo = ({ artifactSourcesStore }) => ({
  createArtifactSource: createResource(
    artifactSourcesStore,
    fromModel,
    toModel,
  ),
  readArtifactSource: readResource(artifactSourcesStore, toModel),
  readAllArtifactSources: readAllResources(
    artifactSourcesStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactSourceExists: resourceExists(artifactSourcesStore),
  updateArtifactSource: updateResource(
    artifactSourcesStore,
    fromModel,
    toModel,
  ),
  updateAllArtifactSources: updateAllResources(
    artifactSourcesStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
