import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { productSaga } from './product';

export default function* rootSaga() {
  yield all([authSaga(), productSaga()]);
  // yield productSaga();
}
