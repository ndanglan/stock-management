import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const auth = (req: Request & any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: 'Authorization is invalid',
    });

    return;
  }

  const token = authHeader.split(' ')[1];
  if (process.env.JWT_SECRET) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      console.log(payload);
      // next();
    } catch (error) {}
  }
};

export default auth;
