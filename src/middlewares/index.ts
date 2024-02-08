import admin from '../config/firebase-config';
import { Request, Response, NextFunction } from 'express';

class Middleware {
  async decodeToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    try {
      if (token) {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
          return next();
        }
      }
       res.json({ message: 'Unauthorize' });
    } catch (e) {
      console.error(e);
       res.status(500).json({ message: 'Internal Error' });
    }
  }
}

export default new Middleware();
