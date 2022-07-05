/*
  Warnings:

  - Added the required column `amount` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `amount` BIGINT NOT NULL,
    ADD COLUMN `total` BIGINT NOT NULL;
