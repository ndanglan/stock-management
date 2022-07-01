import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

export const history: any = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(myRouterMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, createLogger());
  }
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(getMiddleware())
);