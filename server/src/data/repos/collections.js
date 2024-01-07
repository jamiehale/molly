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

export const createCollectionsRepo = ({ collectionsStore }) => ({
  createCollection: createResource(collectionsStore, fromModel, toModel),
  readCollection: readResource(collectionsStore, toModel),
  readAllCollections: readAllResources(
    collectionsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toModel,
  ),
  collectionExists: resourceExists(collectionsStore),
  updateCollection: updateResource(collectionsStore, fromModel, toModel),
  updateAllCollection: updateAllResources(collectionsStore, fromModel, toModel),
  // del: del(db, table),
});
