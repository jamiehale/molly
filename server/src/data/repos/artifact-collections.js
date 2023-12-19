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
  short_name: U.prop('shortName'),
  description: U.prop('description'),
  creator_id: U.prop('creatorId'),
});

const toModel = U.transform({
  id: U.prop('id'),
  title: U.prop('title'),
  shortName: U.prop('short_name'),
  description: U.prop('description'),
  creatorId: U.prop('creator_id'),
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
    U.compose(U.filterEmptyProps, fromModel),
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
