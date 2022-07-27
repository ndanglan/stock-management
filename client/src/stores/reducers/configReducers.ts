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
  orders: {
    list: any[];
    isActionLoading: boolean;
    isLoading: boolean;
    numberOfPage: number;
    config: any;
    selectedSingle?: any;
  };
  returnProducts: {
    list: IProduct[];
    isLoading: boolean;
    isActionLoading: boolean;
    numberOfPage: number;
    selectedSingle?: IProduct | null;
    config: any;
  };
  categories: [];
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
  orders: {
    list: [],
    isActionLoading: false,
    isLoading: false,
    numberOfPage: 1,
    config: null,
    selectedSingle: null,
  },
  returnProducts: {
    list: [],
    isLoading: false,
    isActionLoading: false,
    numberOfPage: 1,
    selectedSingle: null,
    config: null,
  },
  categories: [],
};

const configTableReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ActionTypes.FETCH_CATEGORY_DONE:
      return {
        ...state,
        categories: [...action.payload.data.data],
      };
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
    case ActionTypes.FETCH_SINGLE_ORDER_REQUESTING:
      return {
        ...state,
        orders: {
          ...state.orders,
          isActionLoading: true,
        },
      };
    case ActionTypes.FETCH_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          isActionLoading: false,
          selectedSingle: action.payload?.data || action.payload,
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
          isActionLoading: false,
          config: DataTableConfig.products,
        },
      };
    case ActionTypes.PRODUCT_REJECT_FETCH_SUCCESS:
      return {
        ...state,
        returnProducts: {
          ...state.returnProducts,
          list: action.payload.data.products,
          numberOfPage: action.payload.data.numberOfPage,
          isLoading: false,
          config: DataTableConfig.returnProducts,
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
    case ActionTypes.CREATE_ORDER_REQUESTING:
      return {
        ...state,
        orders: {
          ...state.orders,
          isLoading: true,
        },
      };
    case ActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          isLoading: false,
        },
      };
    case ActionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          list: action.payload.data.orders,
          numberOfPage: action.payload.data.numberOfPage,
          isLoading: false,
          config: DataTableConfig.orders,
        },
      };

    case ActionTypes.DELETE_ORDER_REQUESTING:
      return {
        ...state,
        orders: {
          ...state.orders,
          isLoading: true,
        },
      };
    case ActionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: {
          ...state.orders,
          isLoading: false,
        },
      };
    case ActionTypes.CREATE_ORDER_FAILED:
    case ActionTypes.DELETE_ORDER_FAILED:
    case ActionTypes.FETCH_ORDER_FAILED:
      return {
        ...state,
        orders: {
          ...state.orders,
          list: [],
          message: action.payload.message,
          status: action.payload.statusCode || false,
          isLoading: false,
        },
      };
    default:
      return state;
  }
};

export default configTableReducer;
