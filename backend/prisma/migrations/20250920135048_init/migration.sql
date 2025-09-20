/*
  Warnings:

  - The `version` column on the `Dataset` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Dataset" DROP COLUMN "version",
ADD COLUMN     "version" SERIAL NOT NULL;
