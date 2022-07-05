import { product } from './../../node_modules/.prisma/client/index.d';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    // const product = {
    //   authorId: 1,
    //   code: 'TEST3',
    //   amount: 5,
    //   type: 'T2',
    // };

    // const types = await prisma.category.findMany({
    //   where: {
    //     name: product.type,
    //   },
    // });
    // const isExisting = types.length > 0;

    // const res = await prisma.product.create({
    //   data: {
    //     ...product,
    //     categories: {
    //       create: [
    //         {
    //           category: isExisting
    //             ? {
    //                 connect: {
    //                   name: product.type,
    //                 },
    //               }
    //             : {
    //                 create: {
    //                   name: product.type,
    //                 },
    //               },
    //         },
    //       ],
    //     },
    //   },
    // });
    const dOrders = {
      total: 5,
      amount: 50,
      products: [2, 4, 6],
    };
    const orders = await prisma.order.create({
      data: {
        products: {
          create: [
            ...dOrders.products.map((prod) => ({
              product: {
                connect: {
                  id: prod,
                },
              },
            })),
          ],
        },
        total: dOrders.total,
        amount: dOrders.amount,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

main();
