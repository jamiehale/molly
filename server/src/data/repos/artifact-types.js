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

export const createArtifactTypesRepo = ({ artifactTypesStore }) => ({
  createArtifactType: createResource(artifactTypesStore, fromModel, toModel),
  readArtifactType: readResource(artifactTypesStore, toModel),
  readAllArtifactTypes: readAllResources(
    artifactTypesStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactTypeExists: resourceExists(artifactTypesStore),
  updateArtifactType: updateResource(artifactTypesStore, fromModel, toModel),
  updateAllArtifactTypes: updateAllResources(
    artifactTypesStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
