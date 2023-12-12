import express from 'express';
import { readAllUsers } from '../data/users';
import { get } from '../resource-helpers';

export const getUsers = (db) => () => readAllUsers(db);

export const userRoutes = (db) => {
  const router = express.Router();

  get(router, '/users', getUsers(db));

  return router;
};
