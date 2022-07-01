import { combineReducers } from "redux";
import authReducer from "./authReducer";

import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  screen: uiReducer,
  auth: authReducer,
});

export default rootReducer;