-- DropForeignKey
ALTER TABLE "activityRelationship" DROP CONSTRAINT "activityRelationship_children_id_fkey";

-- DropForeignKey
ALTER TABLE "activityRelationship" DROP CONSTRAINT "activityRelationship_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "annex" DROP CONSTRAINT "annex_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "annex" DROP CONSTRAINT "annex_user_id_fkey";

-- DropForeignKey
ALTER TABLE "collaborators" DROP CONSTRAINT "collaborators_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "collaborators" DROP CONSTRAINT "collaborators_user_id_fkey";

-- DropForeignKey
ALTER TABLE "message_activity" DROP CONSTRAINT "message_activity_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "message_activity" DROP CONSTRAINT "message_activity_user_id_fkey";

-- AddForeignKey
ALTER TABLE "activityRelationship" ADD CONSTRAINT "activityRelationship_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityRelationship" ADD CONSTRAINT "activityRelationship_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annex" ADD CONSTRAINT "annex_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annex" ADD CONSTRAINT "annex_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_activity" ADD CONSTRAINT "message_activity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_activity" ADD CONSTRAINT "message_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
