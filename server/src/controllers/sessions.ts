import { Request, Response } from 'express';
import SessionsServices from '../services/sessions';

export default class SessionsController {
  static async getSessionsPage(req: Request, res: Response, next: Function) {
    await SessionsServices.getSessionsPage(
      req,
      res,
      (err: typeof Error, response: Record<any, any>) => {
        if (err) return next(err);
        else return res.status(200).json(response);
      }
    );
  }
}
