import { isNullOrUndefined } from 'util';
import { IProduct } from '../../interfaces/product-interface';
import { DataTableConfig } from '../../utilities/constants';
import { ActionTypes } from '../constants';

export interface ConfigState {
  products: {
    list: IProduct[];
    isLoading: boolean;
    isActionLoading: boolean;
    numberOfPage: number;
    selectedSingle?: IProduct | null;
    config: any;
  };
  orders: {};
  returnProducts: {};
}

const initialState: ConfigState = {
  products: {
    list: [],
    isLoading: false,
    isActionLoading: false,
    numberOfPage: 1,
    selectedSingle: null,
    config: null,
  },
  orders: {},
  returnProducts: {},
};

const configTableReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_REQUESTING:
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: true,
        },
      };
    case ActionTypes.PRODUCT_FETCH_SINGLE_REQUESTING:
      return {
        ...state,
        products: {
          ...state.products,
          isActionLoading: true,
        },
      };
    case ActionTypes.PRODUCT_UPDATE_REQUESTING:
      return {
        ...state,
        products: {
          ...state.products,
          isActionLoading: true,
        },
      };
    case ActionTypes.PRODUCT_DELETE_REQUESTING:
      return {
        ...state,
        products: {
          ...state.products,
          isActionLoading: true,
        },
      };
    case ActionTypes.PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          list: action.payload.data.products,
          numberOfPage: action.payload.data.numberOfPage,
          isLoading: false,
          config: DataTableConfig.products,
        },
      };
    case ActionTypes.PRODUCT_FETCH_SINGLE_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          isActionLoading: false,
          selectedSingle: action.payload?.data || action.payload,
        },
      };

    case ActionTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          isActionLoading: false,
        },
      };

    case ActionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          isActionLoading: false,
        },
      };
    case ActionTypes.PRODUCT_FAILED:
      return {
        ...state,
        products: {
          ...state.products,
          list: [],
          message: action.payload.message,
          status: action.payload.statusCode || false,
          isActionLoading: false,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};

export default configTableReducer;
