import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as U from '../../util';

const fromModel = U.transform({
  id: U.prop('id'),
  title: U.prop('title'),
});

const toModel = U.transform({
  id: U.prop('id'),
  title: U.prop('title'),
});

export const createArtifactSourceRepo = ({ artifactSourceStore }) => ({
  createArtifactSource: createResource(artifactSourceStore, fromModel, toModel),
  readArtifactSource: readResource(artifactSourceStore, toModel),
  readAllArtifactSources: readAllResources(
    artifactSourceStore,
    U.compose(U.filterEmptyProps, fromModel),
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
