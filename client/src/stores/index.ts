import { createBrowserHistory } from 'history';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './saga';
import { routerMiddleware } from 'react-router-redux';
import persistReducer from 'redux-persist/es/persistReducer';

export const history: any = createBrowserHistory();
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);
export const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, sagaMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, sagaMiddleware, createLogger());
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export default function configureStore() {
  const store = createStore(persistedReducer, composeWithDevTools(getMiddleware()));
  sagaMiddleware.run(rootSagas);
  const persistor = persistStore(store);
  return { store, persistor };
}
