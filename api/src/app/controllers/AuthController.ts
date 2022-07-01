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
      if(user.status){
        delete user.status;
        res.status(StatusCodes.OK).json({
          status:true,
          message:'User created succesfully',
          data:user
        })
      }else if(user.code ==="P2002"){
        res.status(StatusCodes.BAD_REQUEST).json({
          status:false,
          message:'Email is already used',
        })
      }else{
        res.status(StatusCodes.BAD_REQUEST).json({
          status:false,
          message:'Something went wrong',
        })
      }      
    } catch (error:any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status:false,
        message:'OOps something went wrong',
      })
    }
  }

  static async login(req:IAuthRequest,res:IAuthResponse,next:NextFunction){
    try {
      const data = await AuthService.login(req.body);
      
      if(data.status){
        delete data.status;
        res.status(StatusCodes.OK).json({
          status:true,
          message:'Account login succesfully',
          data:data
        })
      }else{
        res.status(StatusCodes.BAD_REQUEST).json({
          status:data.status,
          message:data.message,
        })
      }
    } catch (error:any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status:false,
        message:'OOps something went wrong',
      })
    }
  }
}

export default AuthController;