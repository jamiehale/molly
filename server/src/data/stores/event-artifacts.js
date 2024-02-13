import { createResourceStore } from '../resource-store';

export const createEventArtifactsStore = (db) =>
  createResourceStore(db, 'event_artifacts');
