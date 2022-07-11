import { formatPayload } from './../../utils/functions';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { serialize } from '../../utils/functions';

import { IOrderRequest } from '../../interfaces/interface_order';
import OrderServices from '../services/orders';

class OrderController {
  static async getOrders(req: IOrderRequest, res: Response) {
    const orders: any = await OrderServices.getOrders();
    if (orders && !orders?.statusCode) {
      res.status(StatusCodes.OK).json(formatPayload(true, orders));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(formatPayload(false, 'Opps something went wrong'));
    }
  }

  static async createOrder(req: IOrderRequest, res: Response) {
    const response: any = await OrderServices.createOrder(req.body);
    if (response && !response?.StatusCodes) {
      res.status(StatusCodes.OK).json(formatPayload(true, response));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(formatPayload(false, 'Opps something went wrong'));
    }
  }

  static async deleteOrder(req: IOrderRequest, res: Response) {
    const { id } = req.body;
    const response: any = await OrderServices.deleteOrder(id);
    if (!response?.StatusCodes) {
      res.status(StatusCodes.OK).json(formatPayload(true, undefined, 'Delete succesfully'));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(formatPayload(false, 'Opps something went wrong'));
    }
  }
}

export default OrderController;
