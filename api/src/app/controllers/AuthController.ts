import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AuthService from '../services/auth';
import createError  from 'http-errors';
import { IAuthRegister } from "../../interfaces/interface_auth";

interface IAuthRequest extends Request {
  body:IAuthRegister
}

interface IAuthResponse extends Response {

}

class AuthController{
  static async signUp(req:IAuthRequest,res:IAuthResponse,next:NextFunction) {
    try {
      const user = await AuthService.register(req.body);

      !user.failed ? res.status(StatusCodes.OK).json({
        status:true,
        message:'User created succesfully',
        data:user
      }):user.code ==="P2002"? res.status(StatusCodes.BAD_REQUEST).json({
        status:false,
        message:'This email has been created',
      }):res.status(StatusCodes.BAD_REQUEST).json({
        status:false,
        message:'Something went wrong',
      })
      
    } catch (error:any) {
      next(createError(error.statusCode, error.message))
    }
  }

  static async login(req:IAuthRequest,res:IAuthResponse,next:NextFunction){
    try {
      const data = await AuthService.login(req.body);
      if(data){
        res.status(StatusCodes.OK).json({
          status:true,
          message:'Account login succesfully',
          data:data
        })
      }else{
        res.status(StatusCodes.BAD_REQUEST).json({
          status:false,
          message:'OOps something went wrong',
        })
      }
    } catch (error:any) {
      next(createError(error.statusCode, error.message))
    }
  }
}

export default AuthController;