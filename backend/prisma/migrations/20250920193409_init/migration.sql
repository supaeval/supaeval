/*
  Warnings:

  - The values [DRAFT,PENDING] on the enum `ResourceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ResourceStatus_new" AS ENUM ('PENDING_ANNOTATION', 'ANNOTATING', 'ANNOTATED');
ALTER TABLE "public"."Resource" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Resource" ALTER COLUMN "status" TYPE "public"."ResourceStatus_new" USING ("status"::text::"public"."ResourceStatus_new");
ALTER TYPE "public"."ResourceStatus" RENAME TO "ResourceStatus_old";
ALTER TYPE "public"."ResourceStatus_new" RENAME TO "ResourceStatus";
DROP TYPE "public"."ResourceStatus_old";
ALTER TABLE "public"."Resource" ALTER COLUMN "status" SET DEFAULT 'PENDING_ANNOTATION';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Resource" ALTER COLUMN "status" SET DEFAULT 'PENDING_ANNOTATION';
