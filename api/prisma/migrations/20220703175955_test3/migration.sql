/*
  Warnings:

  - Added the required column `type` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `type` VARCHAR(191) NOT NULL;
