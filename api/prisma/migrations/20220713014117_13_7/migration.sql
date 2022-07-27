/*
  Warnings:

  - A unique constraint covering the columns `[amount]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amountProduct` to the `OrdersOnProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ordersonproducts` ADD COLUMN `amountProduct` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `order_amount_key` ON `order`(`amount`);

-- AddForeignKey
ALTER TABLE `OrdersOnProducts` ADD CONSTRAINT `OrdersOnProducts_amountProduct_fkey` FOREIGN KEY (`amountProduct`) REFERENCES `order`(`amount`) ON DELETE RESTRICT ON UPDATE CASCADE;
