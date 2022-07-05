import { IOrder } from './../../interfaces/interface_order';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OrderServices {
  static async getOrders() {
    try {
      const orders = await prisma.order.findMany({});
      return orders;
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }

  static async createOrder(value: IOrder) {
    const { products, total, amount } = value;
    try {
      const res = prisma.order.create({
        data: {
          products: {
            create: [
              ...products.map((prod) => ({
                product: {
                  connect: {
                    id: Number(prod),
                  },
                },
              })),
            ],
          },
          total: total,
          amount: amount,
        },
      });

      return res;
    } catch (error) {
      return {
        StatusCodes: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }

  static async deleteOrder(data: IOrder['id']) {
    try {
      await prisma.ordersOnProducts.deleteMany({
        where: {
          orderId: Number(data),
        },
      });
      const res = await prisma.order.delete({
        where: {
          id: Number(data),
        },
      });
      console.log(res);
      return res;
    } catch (error) {
      if (error.meta.cause) {
        return {
          StatusCodes: StatusCodes.BAD_REQUEST,
          message: 'Record to delete does not exist.',
        };
      }
      return {
        StatusCodes: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }
}

export default OrderServices;
