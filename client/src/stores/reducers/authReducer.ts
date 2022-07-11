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
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userProfile: { ...action.payload.data },
        message: action.payload.message,
        status: action.payload.status,
      };
    case ActionTypes.AUTH_FAILED:
      return {
        message: action.payload.message,
        status: action.payload.statusCode || false,
      };
    case ActionTypes.AUTH_LOGOUT:
      return {
        userProfile: null,
        message: '',
        status: null,
      };
    default:
      return state;
  }
};

export default authReducer;
