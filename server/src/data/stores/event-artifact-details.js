import { createViewStore } from '../view-store';

export const createEventArtifactDetailsStore = (db) =>
  createViewStore(db, 'event_artifact_details');
