import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth';
import { IAuthRegister } from '../../interfaces/interface_auth';

interface IAuthRequest extends Request {
  body: IAuthRegister;
}

interface IAuthResponse extends Response {}

class AuthController {
  static async signUp(req: IAuthRequest, res: IAuthResponse) {
    const user = await AuthService.register(req.body);
    if (user.accessToken) {
      res.status(StatusCodes.CREATED).json({
        status: true,
        message: 'User created succesfully',
        data: user,
      });
      return;
    }

    res.status(user.statusCode).json({
      ...user,
    });
  }

  static async login(req: IAuthRequest, res: IAuthResponse) {
    const data = await AuthService.login(req.body);
    if (data.accessToken) {
      res.status(StatusCodes.OK).json({ status: true, message: 'Login succesfully', data });
      return;
    }

    res.status(data.statusCode).json({
      ...data,
    });
  }
}

export default AuthController;
