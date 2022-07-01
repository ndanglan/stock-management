import { IAuthAction } from "../../interfaces/auth-interfaces";
import { ActionTypes } from "../constants";

const initialState:any = {
  userProfile:null,
  message:'',
  status:null
};

const authReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_ACTION:
      return {
        userProfile:action.payload.data,
        message:action.payload.message,
  status:action.payload.status
      };
      case ActionTypes.API_FAILED:
      return {
        message:action.payload.message,
  status:action.payload.status
      };
    default:
      return state;
  }
};

export default authReducer;