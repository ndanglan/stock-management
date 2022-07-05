import { IAuth } from './../../interfaces/auth-interfaces';
import { ActionTypes } from '../constants';

export interface IPayloadAuth {
  type: string;
  payload: any;
  callback?: any;
}

export const authAction = (payload: IAuth, callback: any) => {
  return <IPayloadAuth>{
    type: ActionTypes.AUTH_REQUESTING,
    payload,
    callback,
  };
};

export const logOutAction = () => {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
};
