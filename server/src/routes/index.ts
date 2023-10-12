import * as express from 'express';
import UsersRoute from './users';
import SessionsRoute from './session';
import AuthRoute from './auth';

export default function createMainRouter(): express.Router {
  let router = express.Router();

  router.use(`/users`, new UsersRoute().route());
  router.use(`/auth`, new AuthRoute().route());
  router.use(`/sessions`, new SessionsRoute().route());

  return router;
}
