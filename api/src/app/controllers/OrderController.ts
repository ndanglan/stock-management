import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { serialize } from '../../utils/functions';

import { IOrderRequest } from '../../interfaces/interface_order';
import OrderServices from '../services/orders';

class OrderController {
  static async getOrders(req: IOrderRequest, res: Response) {
    const orders: any = await OrderServices.getOrders();
    if (orders && !orders?.statusCode) {
      res.status(StatusCodes.OK).json(orders);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: 'Opps something went wrong',
      });
    }
  }

  static async createOrder(req: IOrderRequest, res: Response) {
    const response: any = await OrderServices.createOrder(req.body);
    if (response && !response?.StatusCodes) {
      const serializeProducts = serialize(response);
      res.status(StatusCodes.OK).json(JSON.parse(serializeProducts));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: 'Opps something went wrong',
      });
    }
  }

  static async deleteOrder(req: IOrderRequest, res: Response) {
    const { id } = req.body;
    const response: any = await OrderServices.deleteOrder(id);
    console.log(response);
    if (!response?.StatusCodes) {
      res.status(StatusCodes.OK).json({
        status: true,
        message: 'Delete successfully',
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: response?.message,
      });
    }
  }
}

export default OrderController;
