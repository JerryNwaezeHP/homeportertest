import { Request, Response } from 'express';
import AuthServices from '../services/auth';
import { ValidateBody } from '../utils/middleware/validate';
import * as Dto from '../dto/auth.dto';

export default class AuthController {
  @ValidateBody(Dto.SetTokenDto)
  static async setTokens(req: Request, res: Response, next: Function) {
    await AuthServices.setTokens(req, res, (err: typeof Error, response: Record<any, any>) => {
      if (err) return next(err);
      else return res.status(201).json(response);
    });
  }
}
