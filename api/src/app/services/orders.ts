import { IOrder } from './../../interfaces/interface_order';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OrderServices {
  static async getOrders(value: IOrder) {
    const { page } = value;
    try {
      const pageNeeded = page || 1;

      const orderToSkip = pageNeeded === 1 ? 0 : (pageNeeded - 1) * 6;
      const users = await prisma.user.findMany({});
      const totalOrder = await prisma.order.findMany({});
      const numberOfPage = Math.ceil(totalOrder.length / 6);
      const orders = await prisma.order.findMany({
        skip: orderToSkip,
        take: 6,
      });
      const newRespose = orders.map((order) => {
        const author = users.find((user) => user.id === order.authorId);
        if (author) {
          return {
            ...order,
            author,
          };
        }

        return {
          ...order,
        };
      });
      return {
        orders: newRespose,
        numberOfPage: numberOfPage,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }
  static async getSingleOrders(value: any) {
    const { id } = value;
    try {
      const users = await prisma.user.findMany({});
      const order = await prisma.order.findUnique({
        where: {
          id: Number(id),
        },
      });
      const products = await prisma.ordersOnProducts.findMany({
        where: {
          orderId: order.orderCode,
        },
      });
      const newProducts = [];
      for (const prod of products) {
        const singleProd = await prisma.product.findUnique({
          where: {
            id: prod.productId,
          },
        });
        if (singleProd) {
          newProducts.push(singleProd);
        }
      }
      let newRespose = null;
      const author = users.find((user) => user.id === order.authorId);
      if (author) {
        newRespose = {
          ...order,
          author,
        };
      } else {
        newRespose = {
          ...order,
        };
      }

      return {
        ...newRespose,
        products: newProducts,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }

  static async createOrder(value: IOrder) {
    const { products, authorId, orderCode } = value;
    console.log('value', value);
    try {
      // update amount of Product
      const product = await prisma.product.findUnique({
        where: {
          id: Number(products[0].id),
        },
      });
      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          amount: Number(product.amount - Number(products[0].amount)),
        },
      });

      // find order
      const orderExist = await prisma.ordersOnProducts.findMany({
        where: {
          orderId: orderCode,
        },
      });
      let total = 0;
      let res = null;
      if (orderExist.length > 0) {
        total = orderExist.reduce((cur, val) => (cur += val.amountProduct), 0);
        const product = await prisma.ordersOnProducts.findMany({
          where: {
            orderId: orderCode,
            productId: products[0].id as any,
          },
        });

        // update tổng số lượng sản phẩm trong đơn hàng
        await prisma.order.updateMany({
          where: {
            orderCode: orderCode,
          },
          data: {
            amount: total + products[0].amount,
          },
        });
        if (product.length > 0) {
          // nếu tìm thấy sản phẩm trùng id thì chỉ update số lượng sản phẩm đó

          const res = await prisma.ordersOnProducts.updateMany({
            where: {
              orderId: orderCode,
              productId: products[0].id as any,
            },
            data: {
              amountProduct: product[0].amountProduct + products[0].amount,
            },
          });

          return res;
        }
        // nếu không tìm thấy sản phẩm cùng id thì tạo ra dỏng mới trong bảng chung
        res = await prisma.ordersOnProducts.create({
          data: {
            productId: Number(products[0].id),
            orderId: orderCode,
            amountProduct: products[0].amount,
          },
        });

        return res;
      }

      res = await prisma.order.create({
        data: {
          authorId,
          products: {
            create: [
              ...products.map((prod) => ({
                product: {
                  connect: {
                    id: Number(prod.id),
                  },
                },
                amountProduct: Number(prod.amount),
              })),
            ],
          },
          amount: products[0].amount,
          orderCode: orderCode,
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
      const selectedOrder = await prisma.order.findUnique({
        where: {
          id: Number(data),
        },
      });
      await prisma.ordersOnProducts.deleteMany({
        where: {
          orderId: selectedOrder.orderCode,
        },
      });
      const res = await prisma.order.delete({
        where: {
          id: Number(data),
        },
      });
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
