import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    // const createCategory = await prisma.post.create({
    //   data: {
    //     title: 'How to be Test',
    //     categories: {
    //       create: [
    //         {
    //           assignedBy: 'Test',
    //           assignedAt: new Date(),
    //           category: {
    //             create: {
    //               name: 'New category2',
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
    const res = await prisma.category.findMany({
      where: {
        name: 'test2',
      },
    });
    console.log(res);

    const assignCategories =
      res.length > 0
        ? await prisma.post.create({
            data: {
              title: 'How to be Bob',
              categories: {
                create: [
                  {
                    assignedBy: 'Bob',
                    assignedAt: new Date(),
                    category: {
                      connect: {
                        name: 'test2',
                      },
                    },
                  },
                ],
              },
            },
          })
        : await prisma.post.create({
            data: {
              title: 'How to be Bob',
              categories: {
                create: [
                  {
                    assignedBy: 'Bob',
                    assignedAt: new Date(),
                    category: {
                      create: {
                        name: 'test2',
                      },
                    },
                  },
                ],
              },
            },
          });
    console.log(assignCategories);
  } catch (error) {
    console.log(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

main();
