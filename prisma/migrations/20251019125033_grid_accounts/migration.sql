/*
  Warnings:

  - You are about to drop the column `gridUserId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."GridSessionProvider" AS ENUM ('privy', 'turnkey', 'solana', 'passkey');

-- CreateEnum
CREATE TYPE "public"."GridSessionTags" AS ENUM ('primary', 'backup', 'solana', 'passkey');

-- DropIndex
DROP INDEX "public"."User_gridUserId_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "gridUserId";

-- CreateTable
CREATE TABLE "public"."GridAccount" (
    "id" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,

    CONSTRAINT "GridAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SessionSecrets" (
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "provider" "public"."GridSessionProvider" NOT NULL,
    "tag" "public"."GridSessionTags" NOT NULL,
    "gridAccountId" TEXT,

    CONSTRAINT "SessionSecrets_pkey" PRIMARY KEY ("publicKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "GridAccount_userAddress_key" ON "public"."GridAccount"("userAddress");

-- CreateIndex
CREATE INDEX "SessionSecrets_gridAccountId_idx" ON "public"."SessionSecrets"("gridAccountId");

-- AddForeignKey
ALTER TABLE "public"."GridAccount" ADD CONSTRAINT "GridAccount_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "public"."User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionSecrets" ADD CONSTRAINT "SessionSecrets_gridAccountId_fkey" FOREIGN KEY ("gridAccountId") REFERENCES "public"."GridAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
