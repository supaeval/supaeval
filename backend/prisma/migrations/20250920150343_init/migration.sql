/*
  Warnings:

  - Added the required column `projectId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Dataset_projectId_key";

-- AlterTable
ALTER TABLE "public"."Resource" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
