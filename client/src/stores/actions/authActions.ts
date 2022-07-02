import { IAuth } from './../../interfaces/auth-interfaces';
import { ActionTypes } from '../constants';

export interface IPayloadAuth {
  type: string;
  payload: any;
}

export const loginAction = (payload: IAuth) => {
  return <IPayloadAuth>{
    type: ActionTypes.API_REQUESTING,
    payload,
  };
};

export const registerAction = (payload: IAuth) => {
  return <IPayloadAuth>{
    type: ActionTypes.API_REQUESTING,
    payload,
  };
};
