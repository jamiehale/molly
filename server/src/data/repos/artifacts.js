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
  description: U.prop('description'),
  type_id: U.prop('typeId'),
  source_id: U.prop('sourceId'),
  collection_id: U.prop('collectionId'),
  creator_id: U.prop('creatorId'),
});

const toModel = U.transform({
  id: U.prop('id'),
  title: U.prop('title'),
  description: U.prop('description'),
  typeId: U.prop('type_id'),
  sourceId: U.prop('source_id'),
  collectionId: U.prop('collection_id'),
  creatorId: U.prop('creator_id'),
});

export const createArtifactRepo = ({ artifactStore }) => ({
  createArtifact: createResource(artifactStore, fromModel, toModel),
  readArtifact: readResource(artifactStore, toModel),
  readAllArtifacts: readAllResources(
    artifactStore,
    U.compose(U.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactExists: resourceExists(artifactStore),
  updateArtifact: updateResource(artifactStore, fromModel, toModel),
  updateAllArtifacts: updateAllResources(artifactStore, fromModel, toModel),
  // del: del(db, table),
});
