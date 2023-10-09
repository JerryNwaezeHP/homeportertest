import * as express from 'express'
import UsersController from '../controllers/users'

class UsersRoute {
  constructor() {}
  public route() {
    let router = express.Router()
    router.get('/:userID', async (req, res, next) => {
      await UsersController.getUserDetails(req, res, next)
    })
    router.post('/', async (req, res, next) => {
      await UsersController.createUser(req, res, next)
    })
    return router
  }
}

export default UsersRoute;
