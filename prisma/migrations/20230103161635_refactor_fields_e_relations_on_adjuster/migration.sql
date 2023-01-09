/*
  Warnings:

  - You are about to drop the column `ultimate_adjuster_id` on the `users_on_roles` table. All the data in the column will be lost.
  - Added the required column `adjuster_id` to the `users_on_roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_on_roles" DROP COLUMN "ultimate_adjuster_id",
ADD COLUMN     "adjuster_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users_on_roles" ADD CONSTRAINT "users_on_roles_adjuster_id_fkey" FOREIGN KEY ("adjuster_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
