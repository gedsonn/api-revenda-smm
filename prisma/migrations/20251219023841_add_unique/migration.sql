/*
  Warnings:

  - A unique constraint covering the columns `[txid]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_txid_key" ON "orders"("txid");
