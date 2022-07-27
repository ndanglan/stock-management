/*
  Warnings:

  - A unique constraint covering the columns `[amount]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `ordersonproducts` DROP FOREIGN KEY `OrdersOnProducts_amountProduct_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `product_amount_key` ON `product`(`amount`);

-- AddForeignKey
ALTER TABLE `OrdersOnProducts` ADD CONSTRAINT `OrdersOnProducts_amountProduct_fkey` FOREIGN KEY (`amountProduct`) REFERENCES `product`(`amount`) ON DELETE RESTRICT ON UPDATE CASCADE;
