import { ActionTypes } from '../constants';

export interface AuthState {
  userProfile?: any;
  message?: string;
  status?: any;
}

const initialState: AuthState = {
  userProfile: null,
  message: '',
  status: null,
};

const authReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ActionTypes.LOGIN_ACTION:
      return {
        ...state,
        userProfile: action.payload.data,
        message: action.payload.message,
        status: action.payload.status,
      };
    case ActionTypes.API_FAILED:
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default authReducer;
