import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const auth = async (req: Request & any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: 'Authorization is invalid',
    });

    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = (await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) as jwt.JwtPayload;
    console.log('payload', payload);
    if (payload.payload.id) {
      req.body.authorId = payload.payload.id;
      console.log(req.body);
      next();
    }
  } catch (error) {}
};

export default auth;
