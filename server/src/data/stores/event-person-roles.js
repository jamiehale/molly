import { createResourceStore } from '../resource-store';

export const createEventPersonRolesStore = (db) =>
  createResourceStore(db, 'event_person_roles');
