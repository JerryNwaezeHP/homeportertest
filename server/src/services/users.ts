import { Users } from '../models'
import { Request, Response } from 'express'

export default class UsersServices {
  static getUserDetails = async (_req: Request, _res: Response, callback: Function) => {
    try {
      const { body } = _req
      const users = await Users.findAll(body)
      return callback(null, users)
    } catch (e) {
      return callback(e, null)
    }
  }

  static createUser = async (_req: Request, _res: Response, callback: Function) => {
    try {
      await Users.create({ cognito_id: '', token: '' })
      return callback(null, { status: 'success', message: 'User created successfully' })
    } catch (e) {
      return callback(e, null)
    }
  }
}
