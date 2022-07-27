import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCategories } from '../../api/services/products';
import { ActionTypes } from '../constants';

export function* handleFetchCaregory() {
  try {
    const { data } = yield call(getCategories);
    yield put({
      type: ActionTypes.FETCH_CATEGORY_DONE,
      payload: {
        ...data,
      },
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.FETCH_CATEGORY_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* watchFetchCategoriesFlow() {
  yield takeLatest(ActionTypes.FETCH_CATEGORY, handleFetchCaregory);
}
export function* categoriesSaga() {
  yield all([watchFetchCategoriesFlow()]);
}
