/*
  Warnings:

  - The primary key for the `annex` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "annex" DROP CONSTRAINT "annex_pkey",
ADD CONSTRAINT "annex_pkey" PRIMARY KEY ("activity_id", "user_id", "publication_date");
