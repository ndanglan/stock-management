import { all, call, put, takeLatest } from 'redux-saga/effects';
import { login, signup } from '../../api/services/auth';
import { IPayloadAuth } from '../actions/authActions';
import { ActionTypes } from '../constants';
import { handleData } from './handleFunction';

function* handleLogin(value: IPayloadAuth) {
  try {
    const { data } = !value.payload.username ? yield call(login, value.payload) : yield call(signup, value.payload);
    yield put({
      type: ActionTypes.AUTH_DONE,
      payload: {
        ...data,
      },
      callback: value.callback,
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.AUTH_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
      callback: value.callback,
    });
  }
}

function* watchAuthFlow() {
  yield takeLatest(ActionTypes.AUTH_REQUESTING, handleLogin);
}

function* watchAuthDone() {
  yield takeLatest(ActionTypes.AUTH_DONE, handleData);
}

export function* authSaga() {
  yield all([watchAuthFlow(), watchAuthDone()]);
}
