import express from 'express';
import { get, withUserId, withParams } from '../resource-helpers';
import { readAsset } from '../data/stores/assets';
import { required } from '../validation';

const assetParams = () => ({
  id: required(),
});

const getAsset = (db) =>
  withUserId(
    withParams(assetParams(), (context) => readAsset(db, context.params.id)),
  );

export const assetRoutes = (db) => {
  const router = express.Router();

  get(router, '/assets/:id', getAsset(db));

  return router;
};
