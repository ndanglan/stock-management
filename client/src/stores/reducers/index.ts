import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import configTableReducer, { ConfigState } from './configReducers';

import uiReducer, { screenState } from './uiReducer';
export interface AppState {
  screen: screenState;
  auth: AuthState;
  configTable: ConfigState;
}

const rootReducer = combineReducers({
  screen: uiReducer,
  auth: authReducer,
  configTable: configTableReducer,
});

export default rootReducer;
