import express from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';
import cors from 'cors';
import { config } from 'dotenv';
import { api } from './api';
import { HttpError, isHttpError } from './error';
import { createEventsStore } from './data/stores/events';
import { createEventsRepo } from './data/repos/events';
import { createArtifactsStore } from './data/stores/artifacts';
import { createArtifactsRepo } from './data/repos/artifacts';
import { createLocationsStore } from './data/stores/locations';
import { createArtifactTypesRepo } from './data/repos/artifact-types';
import { createEventTypesRepo } from './data/repos/event-types';
import { createLocationsRepo } from './data/repos/locations';
import { createApiKeysStore } from './data/stores/api-keys';
import { createAssetsStore } from './data/stores/assets';
import { createArtifactTypesStore } from './data/stores/artifact-types';
import { createEventTypesStore } from './data/stores/event-types';
import { createUsersStore } from './data/stores/users';
import { createApiKeysRepo } from './data/repos/api-keys';
import { createAssetsRepo } from './data/repos/assets';
import { createUsersRepo } from './data/repos/users';
import { createArtifactSourcesRepo } from './data/repos/artifact-sources';
import { createArtifactSourcesStore } from './data/stores/artifact-sources';
import { createCollectionsRepo } from './data/repos/collections';
import { createCollectionsStore } from './data/stores/collections';
import { createVaultsStore } from './data/stores/vaults';
import { createVaultsRepo } from './data/repos/vaults';
import { createGendersStore } from './data/stores/genders';
import { createGendersRepo } from './data/repos/genders';
import { createPeopleStore } from './data/stores/people';
import { createPeopleRepo } from './data/repos/people';
import { createArtifactPersonRolesStore } from './data/stores/artifact-person-roles';
import { createArtifactPersonRolesRepo } from './data/repos/artifact-person-roles';
import { createParentsStore } from './data/stores/parents';
import { createParentsRepo } from './data/repos/parents';
import { createChildrenStore } from './data/stores/children';
import { createChildrenRepo } from './data/repos/children';
import { createParentRolesStore } from './data/stores/parent-roles';
import { createParentRolesRepo } from './data/repos/parent-roles';
import { createParentChildrenStore } from './data/stores/parent-children';
import { createParentChildrenRepo } from './data/repos/parent-children';
import { createPersonDetailsStore } from './data/stores/person-details';
import { createEventDetailsStore } from './data/stores/event-details';
import { createEventPersonDetailsStore } from './data/stores/event-person-details';
import { createEventPeopleStore } from './data/stores/event-people';
import { createEventPeopleRepo } from './data/repos/event-people';
import { createEventPersonRolesStore } from './data/stores/event-person-roles';
import { createEventPersonRolesRepo } from './data/repos/event-person-roles';
import { createEventArtifactsRepo } from './data/repos/event-artifacts';
import { createEventArtifactsStore } from './data/stores/event-artifacts';
import { createEventArtifactDetailsStore } from './data/stores/event-artifact-details';
import { createEventArtifactRolesRepo } from './data/repos/event-artifact-roles';
import { createEventArtifactRolesStore } from './data/stores/event-artifact-roles';

config();

const db = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

const stores = {
  apiKeysStore: createApiKeysStore(db),
  artifactPersonRolesStore: createArtifactPersonRolesStore(db),
  artifactSourcesStore: createArtifactSourcesStore(db),
  artifactTypesStore: createArtifactTypesStore(db),
  artifactsStore: createArtifactsStore(db),
  assetsStore: createAssetsStore(db),
  childrenStore: createChildrenStore(db),
  collectionsStore: createCollectionsStore(db),
  eventArtifactRolesStore: createEventArtifactRolesStore(db),
  eventArtifactsStore: createEventArtifactsStore(db),
  eventArtifactDetailsStore: createEventArtifactDetailsStore(db),
  eventDetailsStore: createEventDetailsStore(db),
  eventPeopleStore: createEventPeopleStore(db),
  eventPersonDetailsStore: createEventPersonDetailsStore(db),
  eventPersonRolesStore: createEventPersonRolesStore(db),
  eventTypesStore: createEventTypesStore(db),
  eventsStore: createEventsStore(db),
  gendersStore: createGendersStore(db),
  locationsStore: createLocationsStore(db),
  parentChildrenStore: createParentChildrenStore(db),
  parentRolesStore: createParentRolesStore(db),
  parentsStore: createParentsStore(db),
  peopleStore: createPeopleStore(db),
  personDetailsStore: createPersonDetailsStore(db),
  usersStore: createUsersStore(db),
  vaultsStore: createVaultsStore(db),
};

const repos = {
  apiKeysRepo: createApiKeysRepo(stores),
  artifactPersonRolesRepo: createArtifactPersonRolesRepo(stores),
  artifactSourcesRepo: createArtifactSourcesRepo(stores),
  artifactTypesRepo: createArtifactTypesRepo(stores),
  artifactsRepo: createArtifactsRepo(stores),
  assetsRepo: createAssetsRepo(stores),
  childrenRepo: createChildrenRepo(stores),
  collectionsRepo: createCollectionsRepo(stores),
  eventArtifactRolesRepo: createEventArtifactRolesRepo(stores),
  eventArtifactsRepo: createEventArtifactsRepo(stores),
  eventPeopleRepo: createEventPeopleRepo(stores),
  eventPersonRolesRepo: createEventPersonRolesRepo(stores),
  eventTypesRepo: createEventTypesRepo(stores),
  eventsRepo: createEventsRepo(stores),
  gendersRepo: createGendersRepo(stores),
  locationsRepo: createLocationsRepo(stores),
  parentChildrenRepo: createParentChildrenRepo(stores),
  parentRolesRepo: createParentRolesRepo(stores),
  parentsRepo: createParentsRepo(stores),
  peopleRepo: createPeopleRepo(stores),
  usersRepo: createUsersRepo(stores),
  vaultsRepo: createVaultsRepo(stores),
};

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('I have a ham radio');
});

app.use('/api', api(repos));

app.use((req, res, next) => {
  next(new HttpError('Not Found', 404));
});

app.use((err, req, res, next) => {
  let status = 500;
  if (isHttpError(err)) {
    status = err.status;
  } else {
    console.error('Error:', err);
  }
  res.status(status).json({
    message: status === 500 ? 'Internal error' : err.message,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
