import express from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';
import { config } from 'dotenv';
import { api } from './api';
import { HttpError, isHttpError } from './error';

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

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('I have a ham radio');
});

app.use('/api', api(db));

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
