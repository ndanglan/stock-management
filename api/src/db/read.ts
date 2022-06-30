import {PrismaClient }from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  try {
    
    const res = await prisma.stock_channel.findMany({
      where:{
        subcribers:{
          gte:11
        }
      }
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }finally{
   async () => {
      await prisma.$disconnect();
   }
  }
}

main()