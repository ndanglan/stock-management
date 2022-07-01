import { combineReducers } from "redux";

import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  screen: uiReducer,
});

export default rootReducer;