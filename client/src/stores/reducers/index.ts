import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';

import uiReducer, { screenState } from './uiReducer';
export interface AppState {
  screen: screenState;
  auth: AuthState;
}

const rootReducer = combineReducers({
  screen: uiReducer,
  auth: authReducer,
});

export default rootReducer;
