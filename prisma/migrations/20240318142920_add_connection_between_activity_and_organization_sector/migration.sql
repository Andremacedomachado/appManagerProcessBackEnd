/*
  Warnings:

  - Added the required column `sector_id` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity" ADD COLUMN     "sector_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "organization_sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
