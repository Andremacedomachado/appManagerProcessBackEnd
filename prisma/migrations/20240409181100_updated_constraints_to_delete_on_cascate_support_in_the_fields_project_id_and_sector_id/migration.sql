-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_project_id_fkey";

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
