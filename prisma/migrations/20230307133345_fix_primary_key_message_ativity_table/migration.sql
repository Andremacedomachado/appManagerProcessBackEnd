/*
  Warnings:

  - The primary key for the `message_activity` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "message_activity" DROP CONSTRAINT "message_activity_pkey",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "message_activity_pkey" PRIMARY KEY ("activity_id", "user_id", "publication_date");
