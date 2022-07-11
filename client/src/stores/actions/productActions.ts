import { ActionTypes } from '../constants';

export const getProducts = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.PRODUCT_FETCH_REQUESTING,
    payload,
    callback,
  };
};

export const createProducts = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.PRODUCT_CREATE_REQUESTING,
    payload,
    callback,
  };
};

export const updateProducts = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.PRODUCT_UPDATE_REQUESTING,
    payload,
    callback,
  };
};

export const getSingleProduct = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.PRODUCT_FETCH_SINGLE_REQUESTING,
    payload,
    callback,
  };
};

export const deleteProduct = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.PRODUCT_DELETE_REQUESTING,
    payload,
    callback,
  };
};
