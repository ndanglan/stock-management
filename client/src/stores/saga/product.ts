import { StatusCodes } from 'http-status-codes';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createProducts,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../../api/services/products';
import { ActionTypes } from '../constants';
import { handleData } from './handleFunction';

function* handleFetchProduct(value?: any) {
  try {
    const { data } = yield call(getProducts, value ? value?.payload : {});
    yield put({
      type: ActionTypes.PRODUCT_DONE,
      payload: {
        ...data,
      },
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.PRODUCT_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* handleCreateProduct(value: any) {
  try {
    const { data } = yield call(createProducts, value.payload);
    if (data.status !== StatusCodes.BAD_REQUEST) {
      yield put({
        type: ActionTypes.PRODUCT_CREATE_DONE,
        payload: {
          ...data,
        },
        callback: value.callback,
      });
      yield handleFetchProduct();
      return;
    }

    yield put({
      type: ActionTypes.PRODUCT_CREATE_DONE,
      payload: {
        message: data.data.message,
      },
      callback: value.callback,
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.PRODUCT_CREATE_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
      callback: value.callback,
    });
  }
}

function* handleUpdateProduct(value: any) {
  try {
    const { data } = yield call(updateProduct, value.payload);
    if (data.status !== StatusCodes.BAD_REQUEST) {
      yield put({
        type: ActionTypes.PRODUCT_UPDATE_DONE,
        payload: {
          ...data,
        },
        callback: value.callback,
      });
      yield handleFetchProduct();
      return;
    }

    yield put({
      type: ActionTypes.PRODUCT_UPDATE_DONE,
      payload: {
        message: data.data.message,
      },
      callback: value.callback,
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.PRODUCT_UPDATE_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
      callback: value.callback,
    });
  }
}

function* handleDeleteProduct(value: any) {
  try {
    console.log(value);
    const { data } = yield call(deleteProduct, value.payload);
    console.log(data);
    if (data?.status !== StatusCodes.BAD_REQUEST) {
      yield put({
        type: ActionTypes.PRODUCT_DELETE_DONE,
        payload: {
          ...data,
        },
        callback: value.callback,
      });
      yield handleFetchProduct();
      return;
    }
    yield put({
      type: ActionTypes.PRODUCT_DELETE_DONE,
      payload: {
        message: data.data.message,
      },
      callback: value.callback,
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.PRODUCT_DELETE_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* handleFetchSingleProduct(value: any) {
  try {
    if (value.payload === null) {
      yield put({
        type: ActionTypes.PRODUCT_FETCH_SINGLE_SUCCESS,
        payload: null,
      });
      return;
    }
    const { data } = yield call(getSingleProduct, value.payload);
    yield put({
      type: ActionTypes.PRODUCT_FETCH_SINGLE_DONE,
      payload: {
        ...data,
      },
    });
  } catch (e: any) {
    yield put({
      type: ActionTypes.PRODUCT_FETCH_SINGLE_DONE,
      payload: {
        message: 'Oops, something went wrong',
      },
    });
  }
}

function* watchFetchProductsFlow() {
  yield takeLatest(ActionTypes.PRODUCT_FETCH_REQUESTING, handleFetchProduct);
}
function* watchFetchProductDone() {
  yield takeLatest(ActionTypes.PRODUCT_DONE, handleData);
}

function* watchCreateProductsFlow() {
  yield takeLatest(ActionTypes.PRODUCT_CREATE_REQUESTING, handleCreateProduct);
}
function* watchCreateProductDone() {
  yield takeLatest(ActionTypes.PRODUCT_CREATE_DONE, handleData);
}

function* watchUpdateProductsFlow() {
  yield takeLatest(ActionTypes.PRODUCT_UPDATE_REQUESTING, handleUpdateProduct);
}
function* watchUpdateProductDone() {
  yield takeLatest(ActionTypes.PRODUCT_UPDATE_DONE, handleData);
}

function* watchFetchSingleProductsFlow() {
  yield takeLatest(ActionTypes.PRODUCT_FETCH_SINGLE_REQUESTING, handleFetchSingleProduct);
}

function* watchFetchSingleProductsDone() {
  yield takeLatest(ActionTypes.PRODUCT_FETCH_SINGLE_DONE, handleData);
}

function* watchDeleteProductsFlow() {
  yield takeLatest(ActionTypes.PRODUCT_DELETE_REQUESTING, handleDeleteProduct);
}

function* watchDeleteProductsDone() {
  yield takeLatest(ActionTypes.PRODUCT_DELETE_DONE, handleData);
}

export function* productSaga() {
  yield all([
    watchFetchProductsFlow(),
    watchCreateProductsFlow(),
    watchUpdateProductsFlow(),
    watchFetchSingleProductsFlow(),
    watchDeleteProductsFlow(),
    watchFetchProductDone(),
    watchCreateProductDone(),
    watchUpdateProductDone(),
    watchFetchSingleProductsDone(),
    watchDeleteProductsDone(),
  ]);
}
