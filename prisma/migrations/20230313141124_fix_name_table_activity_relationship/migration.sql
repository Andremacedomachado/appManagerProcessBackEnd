/*
  Warnings:

  - You are about to drop the `ActivityRelationship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivityRelationship" DROP CONSTRAINT "ActivityRelationship_children_id_fkey";

-- DropForeignKey
ALTER TABLE "ActivityRelationship" DROP CONSTRAINT "ActivityRelationship_parent_id_fkey";

-- DropTable
DROP TABLE "ActivityRelationship";

-- CreateTable
CREATE TABLE "activityRelationship" (
    "parent_id" TEXT NOT NULL,
    "children_id" TEXT NOT NULL,
    "dependency_link_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activityRelationship_pkey" PRIMARY KEY ("parent_id","children_id")
);

-- AddForeignKey
ALTER TABLE "activityRelationship" ADD CONSTRAINT "activityRelationship_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityRelationship" ADD CONSTRAINT "activityRelationship_children_id_fkey" FOREIGN KEY ("children_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
