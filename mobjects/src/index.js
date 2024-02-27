import express from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';
import cors from 'cors';
import { config } from 'dotenv';
import { api } from './api.js';
import { HttpError, isHttpError, isMollyError } from './error.js';
import { createMobjectsStore } from './data/stores/mobjects.js';
import { createMobjectsRepo } from './data/repos/mobjects.js';
import { httpErrorFromMollyError } from './resource-helpers.js';
import { createTagsStore } from './data/stores/tags.js';
import { createAttributesStore } from './data/stores/attributes.js';
import { createFilesStore } from './data/stores/files.js';
import { createMobjectFilesStore } from './data/stores/mobject-files.js';
import { createMobjectDetailsStore } from './data/stores/mobject-details.js';

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
  knexStore: db,
  mobjectsStore: createMobjectsStore(db),
  filesStore: createFilesStore(db),
  mobjectDetailsStore: createMobjectDetailsStore(db),
  mobjectFilesStore: createMobjectFilesStore(db),
  tagsStore: createTagsStore(db),
  attributesStore: createAttributesStore(db),
};

const repos = {
  mobjectsRepo: createMobjectsRepo(stores),
};

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use('/', api({ basePath: process.env.BASE_PATH, tmpPath: '/tmp' }, repos));

app.use((req, res, next) => {
  next(new HttpError('Not Found', 404));
});

app.use((err, req, res, next) => {
  if (isMollyError(err)) {
    err = httpErrorFromMollyError(err);
  }
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
