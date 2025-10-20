/*
  Warnings:

  - Made the column `authentication` on table `GridAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."GridAccount" ALTER COLUMN "authentication" SET NOT NULL;
