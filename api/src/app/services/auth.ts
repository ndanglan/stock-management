import { IAuthRegister, IAuthLogin } from './../../interfaces/interface_auth';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import AuthUtils from '../../utils/jwt';
import createError  from 'http-errors';

const prisma = new PrismaClient();

class AuthService {
  static async register(data:IAuthRegister) {
    data.password = bcrypt.hashSync(data.password, 8);

    try {
      const user =await prisma.user.create({
          data:{
            email:data.email,
            username:data.username,
            password:data.password
          }
      })
      const accessToken = await AuthUtils.signAccessToken(user);
      return {
        email:data.email,
        username:data.username,
        accessToken
      };
      
    } catch (error:any) {
      return {
        ...error,
        failed:true
      }
    }
    }

  static async login(data:IAuthLogin) {
      const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
              email
            }
        });
        if (!user) {
            throw new createError.NotFound('User not registered')
        }
        const checkPassword = bcrypt.compareSync(password, user.password??'')
        if (!checkPassword){
          throw new createError.Unauthorized('Email address or password not valid')
        } 
        const newUser:any={...user};
        delete newUser.password;
        
        const accessToken = await AuthUtils.signAccessToken(newUser)
        return { ...newUser, accessToken }
        
  }
}

export default  AuthService;