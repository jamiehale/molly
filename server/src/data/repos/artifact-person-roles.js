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

export const createArtifactPersonRolesRepo = ({
  artifactPersonRolesStore,
}) => ({
  createArtifactPersonRole: createResource(
    artifactPersonRolesStore,
    fromModel,
    toModel,
  ),
  readArtifactPersonRole: readResource(artifactPersonRolesStore, toModel),
  readAllArtifactPersonRoles: readAllResources(
    artifactPersonRolesStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactPersonRoleExists: resourceExists(artifactPersonRolesStore),
  updateArtifactPersonRole: updateResource(
    artifactPersonRolesStore,
    fromModel,
    toModel,
  ),
  updateAllArtifactPersonRoles: updateAllResources(
    artifactPersonRolesStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
