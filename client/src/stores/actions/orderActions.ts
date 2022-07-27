import { ActionTypes } from '../constants';

export const getOrders = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.FETCH_ORDER_REQUESTING,
    payload,
    callback,
  };
};

export const getSingleOrder = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.FETCH_SINGLE_ORDER_REQUESTING,
    payload,
    callback,
  };
};

export const createOrder = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.CREATE_ORDER_REQUESTING,
    payload,
    callback,
  };
};

export const deleteOrder = (payload?: any, callback?: any) => {
  return {
    type: ActionTypes.DELETE_ORDER_REQUESTING,
    payload,
    callback,
  };
};
