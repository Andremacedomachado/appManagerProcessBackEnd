-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_sector_id_fkey";

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "organization_sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
