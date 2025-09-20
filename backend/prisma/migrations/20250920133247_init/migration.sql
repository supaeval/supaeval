/*
  Warnings:

  - The values [IMAGE_EXTRACTION] on the enum `ProjectType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProjectType_new" AS ENUM ('MULTIMODAL', 'LLM_TEXT', 'INSTANCE_SEGMENTATION');
ALTER TABLE "public"."Project" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "public"."Project" ALTER COLUMN "type" TYPE "public"."ProjectType_new" USING ("type"::text::"public"."ProjectType_new");
ALTER TYPE "public"."ProjectType" RENAME TO "ProjectType_old";
ALTER TYPE "public"."ProjectType_new" RENAME TO "ProjectType";
DROP TYPE "public"."ProjectType_old";
ALTER TABLE "public"."Project" ALTER COLUMN "type" SET DEFAULT 'MULTIMODAL';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Dataset" ADD COLUMN     "version" TEXT NOT NULL DEFAULT '1';

-- AlterTable
ALTER TABLE "public"."Project" ALTER COLUMN "type" SET DEFAULT 'MULTIMODAL';
