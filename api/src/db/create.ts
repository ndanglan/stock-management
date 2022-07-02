import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const data = [
      {
        name: 'ndanglan',
        description: 'FE dev1',
        subcribers: 12,
      },
      {
        name: 'ndanglan2',
        description: 'FE dev2',
        subcribers: 12,
      },
      {
        name: 'ndanglan3',
        description: 'FE dev3',
        subcribers: 12,
      },
      {
        name: 'ndanglan4',
        description: 'FE dev4',
        subcribers: 12,
      },
    ];
    const res = await prisma.stock_channel.createMany({
      data,
      skipDuplicates: true,
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

main();
