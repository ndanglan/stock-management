import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

enum ProductStatus {
  REJECT = 'REJECT',
  ACCEPT = 'ACCEPT',
}

async function main() {
  try {
    const res = await prisma.product.update({
      where: {
        id: 2,
      },
      data: {
        status: ProductStatus.REJECT,
      },
    });

    console.log('res', res);

    const products = await prisma.product.findMany({});
    console.log('products', products);
  } catch (error) {
    console.log(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

main();
