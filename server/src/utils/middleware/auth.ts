// import { Users } from '../../models'
import { Request, Response } from 'express'

export const isAuthenticated = (_req: Request, _res: Response, next: Function) => {
  // validate authorization
  // if (err) return res.status(401).json({ status: 401 })
  try {
    // if authentication works
    next()
  } catch (err) {
    next(err)
  }
}
