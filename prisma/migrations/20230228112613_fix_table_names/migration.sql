/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Annex` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collaborators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageAtivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationSector` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_parent_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_responsible_id_fkey";

-- DropForeignKey
ALTER TABLE "Annex" DROP CONSTRAINT "Annex_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "Annex" DROP CONSTRAINT "Annex_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Collaborators" DROP CONSTRAINT "Collaborators_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "Collaborators" DROP CONSTRAINT "Collaborators_user_id_fkey";

-- DropForeignKey
ALTER TABLE "MessageAtivity" DROP CONSTRAINT "MessageAtivity_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "MessageAtivity" DROP CONSTRAINT "MessageAtivity_user_id_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationSector" DROP CONSTRAINT "OrganizationSector_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organization_sector_id_fkey";

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "Annex";

-- DropTable
DROP TABLE "Collaborators";

-- DropTable
DROP TABLE "MessageAtivity";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "OrganizationSector";

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "employees_allocated" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_sector" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "employees_allocated" INTEGER NOT NULL DEFAULT 0,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "organization_sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3),
    "responsible_id" TEXT NOT NULL,
    "progress_status" "ProgressStatusActivity" NOT NULL DEFAULT 'DO_TO',
    "parent_activity_id" TEXT,
    "dependency_link_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collaborators" (
    "user_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,

    CONSTRAINT "collaborators_pkey" PRIMARY KEY ("user_id","activity_id")
);

-- CreateTable
CREATE TABLE "annex" (
    "original_name" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "annex_pkey" PRIMARY KEY ("activity_id","user_id")
);

-- CreateTable
CREATE TABLE "message_activity" (
    "content" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_message" "TypeMessage" NOT NULL,
    "activity_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "message_activity_pkey" PRIMARY KEY ("activity_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_id_key" ON "organization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_name_key" ON "organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organization_sector_id_key" ON "organization_sector"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_sector_name_key" ON "organization_sector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "activity_id_key" ON "activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "annex_file_name_key" ON "annex"("file_name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_sector_id_fkey" FOREIGN KEY ("organization_sector_id") REFERENCES "organization_sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_sector" ADD CONSTRAINT "organization_sector_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_parent_activity_id_fkey" FOREIGN KEY ("parent_activity_id") REFERENCES "activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annex" ADD CONSTRAINT "annex_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annex" ADD CONSTRAINT "annex_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_activity" ADD CONSTRAINT "message_activity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_activity" ADD CONSTRAINT "message_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
