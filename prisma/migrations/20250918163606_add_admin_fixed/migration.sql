/*
  Warnings:

  - Made the column `admin` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "admin" SET NOT NULL;
