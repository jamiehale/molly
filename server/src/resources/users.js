import express from 'express';
import { readAllUsers } from '../data/stores/users';
import { get } from '../resource-helpers';

export const getUsers =
  ({ usersRepo }) =>
  () =>
    readAllUsers(db);

export const userRoutes = (repos) => {
  const router = express.Router();

  get(router, '/users', getUsers(repos));

  return router;
};
