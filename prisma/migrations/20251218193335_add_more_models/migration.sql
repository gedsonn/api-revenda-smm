-- CreateEnum
CREATE TYPE "OrdemStatus" AS ENUM ('PENDING', 'AWAIT_PAYMENT', 'PROCESSING', 'DONE', 'FAILED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "WalletAction" AS ENUM ('DEPOSIT', 'WITHDRAW', 'ORDER', 'REFUND', 'SALES', 'SPLIT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "taxa" INTEGER NOT NULL DEFAULT 0,
    "lastupdatedService" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyWalet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "locked" INTEGER NOT NULL DEFAULT 0,
    "systemId" INTEGER NOT NULL,

    CONSTRAINT "SyWalet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_wallet_history" (
    "id" TEXT NOT NULL,
    "before" INTEGER NOT NULL,
    "after" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "action" "WalletAction" NOT NULL,
    "reference" TEXT,
    "systemWalletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_wallet_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "locked" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_history" (
    "id" TEXT NOT NULL,
    "before" INTEGER NOT NULL,
    "after" INTEGER NOT NULL,
    "action" "WalletAction" NOT NULL,
    "reference" TEXT,
    "walletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "min" INTEGER NOT NULL DEFAULT 1,
    "max" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "status" "OrdemStatus" NOT NULL DEFAULT 'AWAIT_PAYMENT',
    "extra" JSONB NOT NULL,
    "compradorId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "txid" TEXT NOT NULL,
    "pix" JSONB,
    "keyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apis" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SyWalet_systemId_key" ON "SyWalet"("systemId");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_userId_key" ON "wallets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "apis_key_key" ON "apis"("key");

-- CreateIndex
CREATE INDEX "apis_ownerId_idx" ON "apis"("ownerId");

-- AddForeignKey
ALTER TABLE "SyWalet" ADD CONSTRAINT "SyWalet_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "system"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_wallet_history" ADD CONSTRAINT "system_wallet_history_systemWalletId_fkey" FOREIGN KEY ("systemWalletId") REFERENCES "SyWalet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_history" ADD CONSTRAINT "wallet_history_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "apis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apis" ADD CONSTRAINT "apis_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
