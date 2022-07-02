import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { all, call, put, takeLatest, take } from 'redux-saga/effects';
import { login, signup } from '../../api/services/auth';
import { IPayloadAuth } from '../actions/authActions';
import { ActionTypes } from '../constants';

function* handleLogin(value: IPayloadAuth) {
  try {
    const { data } = !value.payload.username ? yield call(login, value.payload) : yield call(signup, value.payload);

    if (data.status === StatusCodes.CREATED) {
      toast(data.data.message, {
        type: 'success',
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
      });
      yield put({
        type: ActionTypes.LOGIN_ACTION,
        payload: {
          ...data.data,
        },
      });
    } else {
      toast(data.data.message, {
        type: 'error',
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
      });
      yield put({
        type: ActionTypes.API_FAILED,
        payload: {
          ...data.data,
        },
      });
    }
  } catch (e: any) {
    toast('Oops, something went wrong', {
      type: 'error',
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
    });
    yield put({
      type: ActionTypes.API_FAILED,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* watchLoginFlow() {
  yield takeLatest(ActionTypes.API_REQUESTING, handleLogin);
}

export function* authSaga() {
  yield all([watchLoginFlow()]);
}
