import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { categoriesSaga } from './category';
import { orderSaga } from './order';
import { productSaga } from './product';

export default function* rootSaga() {
  yield all([authSaga(), productSaga(), orderSaga(), categoriesSaga()]);
  // yield productSaga();
}
