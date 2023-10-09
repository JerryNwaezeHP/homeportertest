import * as express from 'express';
import SessionsController from '../controllers/sessions';

class SessionsRoute {
  constructor() {}
  public route() {
    let router = express.Router();
    router.get('/', async (req, res, next) => {
      await SessionsController.getSessionsPage(req, res, next);
    })
    return router;
  }
}

export default SessionsRoute;