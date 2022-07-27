-- DropForeignKey
ALTER TABLE `ordersonproducts` DROP FOREIGN KEY `OrdersOnProducts_amountProduct_fkey`;

-- DropIndex
DROP INDEX `product_amount_key` ON `product`;
