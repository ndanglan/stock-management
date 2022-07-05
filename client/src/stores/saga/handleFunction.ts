import { StatusCodes } from 'http-status-codes';
import { put } from 'redux-saga/effects';
import { ActionTypes } from '../constants';

export function* handleData(action: any) {
  const type: string = action.type;
  const payload: any = action.payload;
  const generalType = type.slice(0, type.lastIndexOf('_'));
  const succesType = ActionTypes[`${generalType}_SUCCESS`];
  const failedType = ActionTypes[`${generalType}_FAILED`];

  if (!payload.message) {
    if (payload.status === StatusCodes.CREATED || payload.status === StatusCodes.OK) {
      action.callback(payload.data.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });

      yield put({
        type: succesType,
        payload: {
          ...payload.data,
        },
      });
    } else {
      action.callback(payload.data.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      yield put({
        type: failedType,
        payload: {
          ...payload.data,
        },
      });
    }
  } else {
    action.callback(payload.data.message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
    yield put({
      type: failedType,
      payload: {
        ...payload.message,
      },
    });
  }
}
