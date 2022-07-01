import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga';
import rootSagas from "./saga";

export const history: any = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
// const myRouterMiddleware = routerMiddleware(history);
export const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(sagaMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(sagaMiddleware, createLogger());
  }
};

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(getMiddleware()));
  sagaMiddleware.run(rootSagas);
  return store;
}

