import { ProductDefault } from './../../utils/enum_utils';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import { ProductError, ProductStatus } from '../../utils/enum_utils';
import { IProduct } from '../../interfaces/interface_product';

const prisma = new PrismaClient();

class ProductServices {
  static async getProducts(status?: ProductStatus, page?: number) {
    const pageNeeded = page || 1;

    const productToSkip = pageNeeded === 1 ? 0 : (pageNeeded - 1) * ProductDefault.PRODUCT_PER_PAGE;
    try {
      const totalProduct = status
        ? await prisma.product.findMany({
            where: {
              status,
            },
          })
        : await prisma.product.findMany({
            where: {
              status: ProductStatus.ACCEPT,
            },
          });
      const numberOfPage = Math.ceil(totalProduct.length / ProductDefault.PRODUCT_PER_PAGE);
      const products = status
        ? await prisma.product.findMany({
            skip: productToSkip,
            take: ProductDefault.PRODUCT_PER_PAGE,
            orderBy: [
              {
                createdAt: 'desc',
              },
              {
                amount: 'desc',
              },
            ],
            where: {
              status,
            },
          })
        : await prisma.product.findMany({
            skip: productToSkip,
            take: ProductDefault.PRODUCT_PER_PAGE,
            orderBy: [
              {
                createdAt: 'desc',
              },
              {
                amount: 'desc',
              },
            ],
            where: {
              status: ProductStatus.ACCEPT,
            },
          });
      if (products) {
        return { products: products, numberOfPage } as any;
      }
      return { products: [], numberOfPage: 0 } as any;
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
      const { authorId, code, amount, type, createdAt, status } = value;

      const res = await prisma.product.create({
        data: {
          authorId,
          code,
          amount,
          type,
          createdAt,
          status: status || ProductStatus.ACCEPT,
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
      await prisma.ordersOnProducts.deleteMany({
        where: {
          productId: Number(data),
        },
      });
      const res = await prisma.product.delete({
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

  static async getCategories() {
    try {
      const res = await prisma.category.findMany({});
      return res;
    } catch (error) {
      return {
        StatusCodes: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }
}

export default ProductServices;
