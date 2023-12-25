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

export const createArtifactPersonRoleRepo = ({ artifactPersonRoleStore }) => ({
  createArtifactPersonRole: createResource(
    artifactPersonRoleStore,
    fromModel,
    toModel,
  ),
  readArtifactPersonRole: readResource(artifactPersonRoleStore, toModel),
  readAllArtifactPersonRoles: readAllResources(
    artifactPersonRoleStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactPersonRoleExists: resourceExists(artifactPersonRoleStore),
  updateArtifactPersonRole: updateResource(
    artifactPersonRoleStore,
    fromModel,
    toModel,
  ),
  updateAllArtifactPersonRoles: updateAllResources(
    artifactPersonRoleStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
