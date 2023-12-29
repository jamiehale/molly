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
  short_name: J.prop('shortName'),
  description: J.prop('description'),
  creator_id: J.prop('creatorId'),
});

const toModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
  shortName: J.prop('short_name'),
  description: J.prop('description'),
  creatorId: J.prop('creator_id'),
});

export const createArtifactCollectionRepo = ({ artifactCollectionStore }) => ({
  createArtifactCollection: createResource(
    artifactCollectionStore,
    fromModel,
    toModel,
  ),
  readArtifactCollection: readResource(artifactCollectionStore, toModel),
  readAllArtifactCollections: readAllResources(
    artifactCollectionStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactCollectionExists: resourceExists(artifactCollectionStore),
  updateArtifactCollection: updateResource(
    artifactCollectionStore,
    fromModel,
    toModel,
  ),
  updateAllArtifactCollection: updateAllResources(
    artifactCollectionStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
