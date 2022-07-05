/*
  Warnings:

  - You are about to drop the `_categorytoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ordertoproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categoryToproduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_categoryToproduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_orderToproduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_orderToproduct_B_fkey`;

-- DropTable
DROP TABLE `_categorytoproduct`;

-- DropTable
DROP TABLE `_ordertoproduct`;

-- CreateTable
CREATE TABLE `categoryProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NULL,
    `categoryId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NULL,
    `orderId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categoryProduct` ADD CONSTRAINT `categoryProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryProduct` ADD CONSTRAINT `categoryProduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderProduct` ADD CONSTRAINT `orderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderProduct` ADD CONSTRAINT `orderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
