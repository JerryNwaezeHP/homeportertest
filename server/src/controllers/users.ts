import { Request, Response } from 'express'
import UsersServices from '../services/users'
import * as Dto from '../dto/users.dto'
import { ValidateBody } from '../utils/middleware/validate'

export default class UsersController {
    static async getUserDetails (req: Request, res: Response, next: Function) {
        await UsersServices.getUserDetails(
            req,
            res,
            (err: typeof Error, response: Record<any, any>) => {
                if (err) return next(err)
                else return res.status(200).json(response)
            }
        )
    }
    
    @ValidateBody(Dto.UsersDto)
    static async createUser (req: Request, res: Response, next: Function) {
        await UsersServices.createUser(
            req,
            res,
            (err: typeof Error, response: Record<any, any>) => {
                if (err) return next(err)
                else return res.status(201).json(response)
            }
        )
    }
}