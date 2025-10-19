/*
  Warnings:

  - A unique constraint covering the columns `[gridUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."User_username_key";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "gridUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_gridUserId_key" ON "public"."User"("gridUserId");
