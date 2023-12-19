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

export const createArtifactTypeRepo = ({ artifactTypeStore }) => ({
  createArtifactType: createResource(artifactTypeStore, fromModel, toModel),
  readArtifactType: readResource(artifactTypeStore, toModel),
  readAllArtifactTypes: readAllResources(artifactTypeStore, fromModel, toModel),
  artifactTypeExists: resourceExists(artifactTypeStore),
  updateArtifactType: updateResource(artifactTypeStore, fromModel, toModel),
  updateAllArtifactTypes: updateAllResources(
    artifactTypeStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
