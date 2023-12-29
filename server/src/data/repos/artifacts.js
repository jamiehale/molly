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
  description: J.prop('description'),
  type_id: J.prop('typeId'),
  source_id: J.prop('sourceId'),
  collection_id: J.prop('collectionId'),
  creator_id: J.prop('creatorId'),
});

const toModel = J.transform({
  id: J.prop('id'),
  title: J.prop('title'),
  description: J.prop('description'),
  typeId: J.prop('type_id'),
  sourceId: J.prop('source_id'),
  collectionId: J.prop('collection_id'),
  creatorId: J.prop('creator_id'),
});

export const createArtifactRepo = ({ artifactStore }) => ({
  createArtifact: createResource(artifactStore, fromModel, toModel),
  readArtifact: readResource(artifactStore, toModel),
  readAllArtifacts: readAllResources(
    artifactStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactExists: resourceExists(artifactStore),
  updateArtifact: updateResource(artifactStore, fromModel, toModel),
  updateAllArtifacts: updateAllResources(artifactStore, fromModel, toModel),
  // del: del(db, table),
});
