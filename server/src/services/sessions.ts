import { Request, Response } from 'express';

export default class UsersServices {
  static getSessionsPage = async (_req: Request, res: Response, callback: Function) => {
    try {
      const data = {
        fruits: ["Apple", "Mango", "Pineapple", "Banana", "Grape"]
      }
      return res.render('sessions', data); 
    } catch (e) {
      return callback(e, null);
    }
  };
}