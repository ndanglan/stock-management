/*
  Warnings:

  - A unique constraint covering the columns `[orderCode]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderCode` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ordersonproducts` DROP FOREIGN KEY `OrdersOnProducts_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `orderCode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ordersonproducts` MODIFY `orderId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `order_orderCode_key` ON `order`(`orderCode`);

-- AddForeignKey
ALTER TABLE `OrdersOnProducts` ADD CONSTRAINT `OrdersOnProducts_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`orderCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
