import express from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';
import { config } from 'dotenv';
import { api } from './api';
import { HttpError, isHttpError } from './error';
import { createEventStore } from './data/stores/events';
import { createEventRepo } from './data/repos/events';
import { createArtifactStore } from './data/stores/artifacts';
import { createArtifactRepo } from './data/repos/artifacts';
import { createLocationStore } from './data/stores/locations';
import { createArtifactTypeRepo } from './data/repos/artifact-types';
import { createEventTypeRepo } from './data/repos/event-types';
import { createLocationRepo } from './data/repos/locations';
import { createApiKeyStore } from './data/stores/api-keys';
import { createAssetStore } from './data/stores/assets';
import { createArtifactTypeStore } from './data/stores/artifact-types';
import { createEventTypeStore } from './data/stores/event-types';
import { createUsersStore } from './data/stores/users';
import { createApiKeyRepo } from './data/repos/api-keys';
import { createAssetRepo } from './data/repos/assets';
import { createUserRepo } from './data/repos/users';
import { createArtifactSourceRepo } from './data/repos/artifact-sources';
import { createArtifactSourceStore } from './data/stores/artifact-sources';
import { createArtifactCollectionRepo } from './data/repos/artifact-collections';
import { createArtifactCollectionStore } from './data/stores/artifact-collections';
import { createVaultStore } from './data/stores/vaults';
import { createVaultRepo } from './data/repos/vaults';

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
  apiKeyStore: createApiKeyStore(db),
  artifactCollectionStore: createArtifactCollectionStore(db),
  artifactSourceStore: createArtifactSourceStore(db),
  artifactTypeStore: createArtifactTypeStore(db),
  artifactStore: createArtifactStore(db),
  assetStore: createAssetStore(db),
  eventTypeStore: createEventTypeStore(db),
  eventStore: createEventStore(db),
  locationStore: createLocationStore(db),
  userStore: createUsersStore(db),
  vaultStore: createVaultStore(db),
};

const repos = {
  apiKeyRepo: createApiKeyRepo(stores),
  artifactCollectionRepo: createArtifactCollectionRepo(stores),
  artifactSourceRepo: createArtifactSourceRepo(stores),
  artifactTypeRepo: createArtifactTypeRepo(stores),
  artifactRepo: createArtifactRepo(stores),
  assetRepo: createAssetRepo(stores),
  eventTypeRepo: createEventTypeRepo(stores),
  eventRepo: createEventRepo(stores),
  locationRepo: createLocationRepo(stores),
  userRepo: createUserRepo(stores),
  vaultRepo: createVaultRepo(stores),
};

const app = express();
const port = process.env.PORT;

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
