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

      if (products.length > 0) {
        let newCate: any[] = [];

        for (const product of products) {
          const cate = await prisma.categoriesOnProducts.findMany({
            where: {
              productId: product.id,
            },
          });

          newCate.push({
            ...product,
            type: cate.map((cat) => cat.categoryId),
          });
        }
        return { products: newCate, numberOfPage } as any;
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
      const categories = await prisma.categoriesOnProducts.findMany({
        where: {
          productId: Number(productId),
        },
      });
      const product = await prisma.product.findUnique({
        where: {
          id: Number(productId),
        },
      });
      return {
        ...product,
        type: categories.map((cat) => cat.categoryId),
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Oops, something went wrong',
      };
    }
  }

  static async createProduct(value: IProduct) {
    try {
      const { authorId, code, amount, type, createdAt, status } = value;

      // find product existing
      const existedProduct = await prisma.product.findUnique({
        where: {
          code: code,
        },
      });

      if (existedProduct) {
        const res = await prisma.product.update({
          where: {
            code: code,
          },
          data: {
            amount: existedProduct.amount + amount,
            createdAt,
          },
        });

        return res;
      }

      const n = type.map((t) => ({
        category: {
          connect: {
            id: t.id,
          },
        },
      }));

      const res = await prisma.product.create({
        data: {
          authorId,
          code,
          amount,
          createdAt,
          status: status || ProductStatus.ACCEPT,
          categories: {
            create: [...n],
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
    const { id, type, amount, status, createdAt, code } = data;
    try {
      if (type?.length > 0) {
        await prisma.categoriesOnProducts.deleteMany({
          where: {
            productId: Number(id),
          },
        });
        for (const t of type) {
          await prisma.categoriesOnProducts.createMany({
            data: {
              productId: Number(id),
              categoryId: Number(t.id),
            },
          });
        }
      }
      const res = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: {
          amount: Number(amount),
          status,
          createdAt,
          code,
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
