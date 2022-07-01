import { IAuth } from 'interfaces/auth-interfaces';
import API from '../axios';

const login = (payload:IAuth)=>{
  return API.post(`/auth/login`,payload).then((response)=>{
    return response
  }).catch(error=>error.response);
}

const signup = (payload:IAuth)=>{
  const newPayload = {
    email:payload.email,
    password:payload.password,
    username:payload.username,
    confirmpassword:payload.confirmPassword
  }
  return API.post(`/auth/signup`,newPayload).then((response)=>({data:response.data,status:response.status})).catch(error=>error);
}

export {login,signup};