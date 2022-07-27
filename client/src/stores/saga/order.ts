import { StatusCodes } from 'http-status-codes';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getOrders, deleteOrder, createOrders, getSingleOrder } from '../../api/services/orders';
import { ActionTypes } from '../constants';
import { handleData } from './handleFunction';
import { handleFetchProduct } from './product';

function* handleFetchOrders(value: any) {
  try {
    const { data } = yield call(getOrders, value.payload);
    yield put({
      type: ActionTypes.FETCH_ORDER_DONE,
      payload: {
        ...data,
      },
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.FETCH_ORDER_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* handleFetchSingleOrder(value: any) {
  try {
    const { data } = yield call(getSingleOrder, value.payload);
    yield put({
      type: ActionTypes.FETCH_SINGLE_ORDER_DONE,
      payload: {
        ...data,
      },
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.FETCH_SINGLE_ORDER_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* handleCreateOrder(value: any) {
  try {
    const { data } = yield call(createOrders, value.payload);
    if (data.status !== StatusCodes.BAD_REQUEST) {
      yield put({
        type: ActionTypes.CREATE_ORDER_DONE,
        payload: {
          ...data,
        },
        callback: value.callback,
      });
      yield handleFetchProduct();
      return;
    }

    yield put({
      type: ActionTypes.CREATE_ORDER_DONE,
      payload: {
        message: data.data.message,
      },
      callback: value.callback,
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.CREATE_ORDER_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
      callback: value.callback,
    });
  }
}

function* handleDeleteOrder(value: any) {
  try {
    const { data } = yield call(deleteOrder, value.payload);
    if (data?.status !== StatusCodes.BAD_REQUEST) {
      yield put({
        type: ActionTypes.DELETE_ORDER_DONE,
        payload: {
          ...data,
        },
        callback: value.callback,
      });
      yield handleFetchOrders({ page: 1 });
      return;
    }
    yield put({
      type: ActionTypes.DELETE_ORDER_DONE,
      payload: {
        message: data.data.message,
      },
      callback: value.callback,
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.DELETE_ORDER_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* watchFetchOrdersFlow() {
  yield takeLatest(ActionTypes.FETCH_ORDER_REQUESTING, handleFetchOrders);
}
function* watchFetchOrderDone() {
  yield takeLatest(ActionTypes.FETCH_ORDER_DONE, handleData);
}

function* watchCreateOrdersFlow() {
  yield takeLatest(ActionTypes.CREATE_ORDER_REQUESTING, handleCreateOrder);
}
function* watchCreateOrderDone() {
  yield takeLatest(ActionTypes.CREATE_ORDER_DONE, handleData);
}

function* watchDeleteOrderFlow() {
  yield takeLatest(ActionTypes.DELETE_ORDER_REQUESTING, handleDeleteOrder);
}

function* watchDeleteOrderDone() {
  yield takeLatest(ActionTypes.DELETE_ORDER_DONE, handleData);
}

function* watchFetchSingleOrderFlow() {
  yield takeLatest(ActionTypes.FETCH_SINGLE_ORDER_REQUESTING, handleFetchSingleOrder);
}

function* watchFetchSingleOrderDone() {
  yield takeLatest(ActionTypes.FETCH_SINGLE_ORDER_DONE, handleData);
}

export function* orderSaga() {
  yield all([
    watchFetchOrdersFlow(),
    watchFetchOrderDone(),
    watchCreateOrdersFlow(),
    watchCreateOrderDone(),
    watchDeleteOrderFlow(),
    watchDeleteOrderDone(),
    watchFetchSingleOrderFlow(),
    watchFetchSingleOrderDone(),
  ]);
}
