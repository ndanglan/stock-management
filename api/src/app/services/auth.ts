import { IAuthRegister, IAuthLogin } from './../../interfaces/interface_auth';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import AuthUtils from '../../utils/jwt';

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
      console.log(user);
      if(user){
        const accessToken = await AuthUtils.signAccessToken(user);
        return {
          status:true,
          data:{
            email:data.email,
            username:data.username,
            accessToken
          }
        };
      }

      return {
        status:false,
        message:'Sign up failed'
      }
      
    } catch (error:any) {
      return {
        ...error,
        status:false
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
            return {
              status:false,
              message:'User is not registered'
            }
        }
        const checkPassword = bcrypt.compareSync(password, user.password??'')
        if (!checkPassword){
          return {
            status:false,
            message:'Wrong password'
          }
        } 
        const newUser:any={...user};
        delete newUser.password;
        
        const accessToken = await AuthUtils.signAccessToken(newUser)
        return { ...newUser, accessToken,status:true}
        
  }
}

export default  AuthService;