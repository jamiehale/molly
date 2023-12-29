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

export const createArtifactTypeRepo = ({ artifactTypeStore }) => ({
  createArtifactType: createResource(artifactTypeStore, fromModel, toModel),
  readArtifactType: readResource(artifactTypeStore, toModel),
  readAllArtifactTypes: readAllResources(
    artifactTypeStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactTypeExists: resourceExists(artifactTypeStore),
  updateArtifactType: updateResource(artifactTypeStore, fromModel, toModel),
  updateAllArtifactTypes: updateAllResources(
    artifactTypeStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
