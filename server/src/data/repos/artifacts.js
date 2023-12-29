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

export const createArtifactsRepo = ({ artifactsStore }) => ({
  createArtifact: createResource(artifactsStore, fromModel, toModel),
  readArtifact: readResource(artifactsStore, toModel),
  readAllArtifacts: readAllResources(
    artifactsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  artifactExists: resourceExists(artifactsStore),
  updateArtifact: updateResource(artifactsStore, fromModel, toModel),
  updateAllArtifacts: updateAllResources(artifactsStore, fromModel, toModel),
  // del: del(db, table),
});
