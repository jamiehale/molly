import { createResourceStore } from '../resource-store';

export const createEventArtifactRolesStore = (db) =>
  createResourceStore(db, 'event_artifact_roles');
