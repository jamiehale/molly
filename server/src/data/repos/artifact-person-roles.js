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

export const createArtifactPersonRoleRepo = ({ artifactPersonRoleStore }) => ({
  createArtifactPersonRole: createResource(
    artifactPersonRoleStore,
    fromModel,
    toModel,
  ),
  readArtifactPersonRole: readResource(artifactPersonRoleStore, toModel),
  readAllArtifactPersonRoles: readAllResources(
    artifactPersonRoleStore,
    J.compose(J.filterEmptyProps, fromModel),
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
