import { Request, Response } from 'express';

export default class AuthServices {
  static setTokens = async (_req: Request, _res: Response, callback: Function) => {
    try {
      console.log('REQ_BODY', _req.body);
      return callback(null, {});
    } catch (e) {
      return callback(e, null);
    }
  };
}
