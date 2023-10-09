import * as express from 'express';
import UsersRoute from './users';

export default function createMainRouter(): express.Router {
  const router = express.Router();

  router.use(`users`, new UsersRoute().route());

  return router;
}
