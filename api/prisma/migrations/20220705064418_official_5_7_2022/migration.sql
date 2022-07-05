/*
  Warnings:

  - You are about to alter the column `amount` on the `order` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `amount` on the `product` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `amount` INTEGER NOT NULL,
    MODIFY `total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `amount` INTEGER NOT NULL;
