import * as express from 'express';
import SessionsController from '../controllers/sessions';

class SessionsRoute {
  constructor() {}
  public route() {
    let router = express.Router();
    /**
     * @openapi
     * /sessions:
     *   get:
     *     summary: Ejs page for session
     *     tags:
     *       - Sessions
     *     responses:
     *       200:
     *         description: Successful response
     */
    router.get('/', async (req, res, next) => {
      await SessionsController.getSessionsPage(req, res, next);
    });
    return router;
  }
}

export default SessionsRoute;
