/*
  Warnings:

  - The primary key for the `categoriesonproducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `CategoriesOnProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoriesonproducts` DROP FOREIGN KEY `CategoriesOnProducts_productId_fkey`;

-- AlterTable
ALTER TABLE `categoriesonproducts` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `productId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `CategoriesOnProducts` ADD CONSTRAINT `CategoriesOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
