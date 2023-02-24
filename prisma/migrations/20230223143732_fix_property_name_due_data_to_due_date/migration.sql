/*
  Warnings:

  - You are about to drop the column `due_data` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "due_data",
ADD COLUMN     "due_date" TIMESTAMP(3);
