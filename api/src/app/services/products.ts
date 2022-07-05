import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import { ProductError, ProductStatus } from '../../utils/enum_utils';
import { IProduct } from '../../interfaces/interface_product';

const prisma = new PrismaClient();

class ProductServices {
  static async getProducts(status?: ProductStatus) {
    try {
      const products = status
        ? await prisma.product.findMany({
            where: {
              status,
            },
          })
        : await prisma.product.findMany({
            where: {
              status,
            },
          });
      if (products) {
        return products;
      }
      return [];
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }

  static async getSingleProduct(productId: string) {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: Number(productId),
        },
      });
      return product;
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }

  static async createProduct(value: IProduct) {
    try {
      const categories = await prisma.category.findMany({
        where: {
          name: value.type,
        },
      });
      const isExisting = categories.length > 0;
      const { authorId, code, amount, type } = value;

      const res = await prisma.product.create({
        data: {
          authorId,
          code,
          amount,
          type,
          categories: {
            create: [
              {
                category: isExisting
                  ? {
                      connect: {
                        name: value.type,
                      },
                    }
                  : {
                      create: {
                        name: value.type,
                      },
                    },
              },
            ],
          },
        },
      });
      if (res) {
        return res;
      }
      return null;
    } catch (error) {
      if (error.meta.target === ProductError.CODE) {
        return {
          StatusCodes: StatusCodes.CONFLICT,
          message: 'The code is existed',
        };
      }
      return {
        StatusCodes: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }
  static async updateProduct(data: IProduct) {
    const { id, ...others } = data;
    try {
      const res = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: {
          ...others,
        },
      });
      return res;
    } catch (error) {
      if (error.meta.target === ProductError.CODE) {
        return {
          StatusCodes: StatusCodes.CONFLICT,
          message: 'The code is existed',
        };
      }
      return {
        StatusCodes: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }
  static async deleteProduct(data: IProduct['id']) {
    try {
      await prisma.categoriesOnProducts.deleteMany({
        where: {
          productId: Number(data),
        },
      });
      const res = await prisma.product.delete({
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

export default ProductServices;
