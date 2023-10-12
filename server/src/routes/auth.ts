import * as express from 'express';
import AuthController from '../controllers/auth';

class AuthRoute {
  constructor() {}
  public route() {
    let router = express.Router();
    /**
     * @openapi
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *     responses:
     *       201:
     *         description: User created successfully
     *       400:
     *         description: Invalid request
     */
    router.post('/set-tokens', async (req, res, next) => {
      await AuthController.setTokens(req, res, next);
    });
    return router;
  }
}

export default AuthRoute;