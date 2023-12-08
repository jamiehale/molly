import express from 'express';
import bodyParser from 'body-parser';
import Knex from 'knex';
import { config } from 'dotenv';

config();

const knex = Knex({
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

let artifacts = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('I have a ham radio');
  console.log(artifacts);
});

app.get('/artifacts', (req, res) => {
  res.json(JSON.stringify(artifacts));
});

app.post('/artifacts', (req, res) => {
  artifacts = [...artifacts, req.body];
  res.json(JSON.stringify(req.body));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
