-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_responsible_id_fkey";

-- DropForeignKey
ALTER TABLE "users_on_roles" DROP CONSTRAINT "users_on_roles_adjuster_id_fkey";

-- AddForeignKey
ALTER TABLE "users_on_roles" ADD CONSTRAINT "users_on_roles_adjuster_id_fkey" FOREIGN KEY ("adjuster_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
