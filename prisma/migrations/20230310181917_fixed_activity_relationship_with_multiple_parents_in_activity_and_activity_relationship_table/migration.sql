/*
  Warnings:

  - You are about to drop the column `dependency_link_date` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `parent_activity_id` on the `activity` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NodeTypeActivity" AS ENUM ('INITIAL', 'FINALLY');

-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_parent_activity_id_fkey";

-- AlterTable
ALTER TABLE "activity" DROP COLUMN "dependency_link_date",
DROP COLUMN "parent_activity_id",
ADD COLUMN     "type_node" "NodeTypeActivity";

-- CreateTable
CREATE TABLE "ActivityRelationship" (
    "parent_id" TEXT NOT NULL,
    "children_id" TEXT NOT NULL,
    "dependency_link_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityRelationship_pkey" PRIMARY KEY ("parent_id","children_id")
);

-- AddForeignKey
ALTER TABLE "ActivityRelationship" ADD CONSTRAINT "ActivityRelationship_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRelationship" ADD CONSTRAINT "ActivityRelationship_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
