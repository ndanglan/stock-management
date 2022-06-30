import createError  from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

class AuthUtils{

  signAccessToken=(payload:any)=>{
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret??'', {}, (err, token) => {
          if (err) {
            reject(new createError.InternalServerError())
          }
            resolve(token)
      })
  })
  }

  verifyAccessToken=(token:string)=>{
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret??'', (err, payload) => {
          if (err) {
              const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
              return reject(new createError.Unauthorized(message))
          }
          resolve(payload)
      })
  })
  }
}

export default new AuthUtils

