import {Express} from 'express'
import  config  from 'config';
import authRouter from './authentication';

const baseUri = config.get<string>("serverConfig.baseUri")

const route=(app:Express)=>{
  app.use(`${baseUri}/auth`,authRouter);

  app.use('/',(req,res)=>{
    res.send('<h1>Stock management api</h1>')
  })
}

export default route 