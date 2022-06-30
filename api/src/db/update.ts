import {PrismaClient }from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  try {
    
    const res = await prisma.stock_channel.update({
      where:{
        id:4
      },
      data:{
        name:'Test update once'
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