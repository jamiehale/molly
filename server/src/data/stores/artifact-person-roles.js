import { createResourceStore } from '../resource-store';

export const createArtifactPersonRoleStore = (db) =>
  createResourceStore(db, 'artifact_person_roles');
