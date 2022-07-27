import { screenResize } from './uiAction';
import { authAction } from './authActions';
import {
  getProducts as getProductAction,
  createProducts as createProductsAction,
  updateProducts as updateProductActions,
  getSingleProduct as getSingleProductAction,
  deleteProduct as deleteProductAction,
} from './productActions';
import {
  getOrders as getOrdersAction,
  createOrder as createOrderAction,
  deleteOrder as deleteOrderAction,
} from './orderActions';
export {
  screenResize,
  authAction,
  getProductAction,
  createProductsAction,
  updateProductActions,
  getSingleProductAction,
  deleteProductAction,
  getOrdersAction,
  createOrderAction,
  deleteOrderAction,
};
