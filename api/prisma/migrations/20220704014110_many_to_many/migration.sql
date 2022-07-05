/*
  Warnings:

  - You are about to drop the `categoryproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `return_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoryproduct` DROP FOREIGN KEY `categoryProduct_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryproduct` DROP FOREIGN KEY `categoryProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `orderProduct_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `orderProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_authorId_fkey`;

-- DropTable
DROP TABLE `categoryproduct`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `orderproduct`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `return_product`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriesOnPosts` (
    `postId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnPosts` ADD CONSTRAINT `CategoriesOnPosts_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
