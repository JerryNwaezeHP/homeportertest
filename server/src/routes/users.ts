import * as express from 'express';
import UsersController from '../controllers/users';

class UsersRoute {
  constructor() {}
  public route() {
    let router = express.Router();
    /**
     * @openapi
     * /users/{userID}:
     *   get:
     *     summary: Get user details by userID
     *     tags:
     *       - Users
     *     parameters:
     *       - in: path
     *         name: userID
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user to retrieve
     *     responses:
     *       200:
     *         description: Successful response
     */
    router.get('/:userID', async (req, res, next) => {
      await UsersController.getUserDetails(req, res, next);
    });
    /**
     * @swagger
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
    router.post('/', async (req, res, next) => {
      await UsersController.createUser(req, res, next);
    });
    return router;
  }
}

export default UsersRoute;
