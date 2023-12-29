import { createResourceStore } from '../resource-store';

export const createArtifactPersonRolesStore = (db) =>
  createResourceStore(db, 'artifact_person_roles');
