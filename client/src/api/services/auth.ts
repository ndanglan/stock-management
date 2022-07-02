import { IAuth } from 'interfaces/auth-interfaces';
import API from '../axios';

const login = (payload: IAuth) => {
  return API.post(`/auth/login`, payload)
    .then((response) => {
      console.log(response);
      return { data: response, status: response.status };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

const signup = (payload: IAuth) => {
  const newPayload = {
    email: payload.email,
    password: payload.password,
    username: payload.username,
    confirmpassword: payload.confirmpassword,
  };
  return API.post(`/auth/signup`, newPayload)
    .then((response) => {
      console.log(response);
      return { data: response, status: response.status };
    })
    .catch((error) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

export { login, signup };
