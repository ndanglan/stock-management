import { AuthError } from './../../utils/enum_utils';
import { StatusCodes } from 'http-status-codes';
import { IAuthRegister, IAuthLogin } from './../../interfaces/interface_auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import AuthUtils from '../../utils/jwt';

const prisma = new PrismaClient();

class AuthService {
  static async register(data: IAuthRegister) {
    data.password = bcrypt.hashSync(data.password, 8);
    try {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: data.password,
        },
      });
      if (user) {
        const accessToken = await AuthUtils.signAccessToken(user);
        return {
          email: data.email,
          username: data.username,
          accessToken,
        };
      }

      return null;
    } catch (error) {
      if (error.meta.target === AuthError.EMAIL) {
        return {
          statusCode: StatusCodes.CONFLICT,
          message: 'Email is existed',
        };
      }
    }
  }

  static async login(data: IAuthLogin) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'User is not registered',
      };
    }
    const checkPassword = bcrypt.compareSync(password, user.password ?? '');
    if (!checkPassword) {
      return {
        statusCode: StatusCodes.FORBIDDEN,
        message: 'Wrong password',
      };
    }
    const newUser: any = { ...user };
    delete newUser.password;

    const accessToken = await AuthUtils.signAccessToken(newUser);
    return { ...newUser, accessToken };
  }
}

export default AuthService;
