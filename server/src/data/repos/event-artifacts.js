import {
  createResource,
  readAllResources,
  readResource,
  resourceExists,
  updateAllResources,
  updateResource,
} from '../resource-repo';
import * as J from '../../jlib';
import { toInternalError } from '../../error';

const fromModel = J.transform({
  event_id: J.prop('eventId'),
  artifact_id: J.prop('artifactId'),
});

const toModel = J.transform({
  eventId: J.prop('event_id'),
  artifactId: J.prop('artifact_id'),
});

const toDetailsModel = J.transform({
  eventId: J.prop('event_id'),
  id: J.prop('id'),
  title: J.prop('title'),
  description: J.prop('description'),
  typeId: J.prop('type_id'),
  typeTitle: J.prop('type_title'),
  sourceId: J.prop('source_id'),
  sourceTitle: J.prop('source_title'),
  collectionId: J.prop('collection_id'),
  collectionTitle: J.prop('collection_title'),
  creatorId: J.prop('creator_id'),
});

const queryArtifacts = (store, toModelFn) => (q) =>
  store.queryArtifacts(q).then(J.map(toModelFn)).catch(toInternalError);

export const createEventArtifactsRepo = ({
  eventArtifactsStore,
  eventArtifactDetailsStore,
}) => ({
  createEventArtifact: createResource(eventArtifactsStore, fromModel, toModel),
  readEventArtifact: readResource(eventArtifactDetailsStore, toDetailsModel),
  readAllEventArtifacts: readAllResources(
    eventArtifactDetailsStore,
    J.compose(J.filterEmptyProps, fromModel),
    toDetailsModel,
  ),
  queryEventArtifacts: queryArtifacts(
    eventArtifactDetailsStore,
    toDetailsModel,
  ),
  eventArtifactExists: resourceExists(eventArtifactsStore),
  updateEventArtifact: updateResource(eventArtifactsStore, fromModel, toModel),
  updateAllEventArtifacts: updateAllResources(
    eventArtifactsStore,
    fromModel,
    toModel,
  ),
  // del: del(db, table),
});
