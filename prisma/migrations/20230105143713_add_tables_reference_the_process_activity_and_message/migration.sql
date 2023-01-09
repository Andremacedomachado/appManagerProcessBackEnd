-- CreateEnum
CREATE TYPE "ProgressStatusActivity" AS ENUM ('DO_TO', 'CLOSED');

-- CreateEnum
CREATE TYPE "TypeMessage" AS ENUM ('SYSTEM', 'USER');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "due_data" TIMESTAMP(3),
    "responsible_id" TEXT NOT NULL,
    "progress_status" "ProgressStatusActivity" NOT NULL DEFAULT 'DO_TO',
    "parent_activity_id" TEXT,
    "dependency_link_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborators" (
    "user_id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,

    CONSTRAINT "Collaborators_pkey" PRIMARY KEY ("user_id","activity_id")
);

-- CreateTable
CREATE TABLE "Annex" (
    "original_name" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Annex_pkey" PRIMARY KEY ("activity_id","user_id")
);

-- CreateTable
CREATE TABLE "MessageAtivity" (
    "content" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_message" "TypeMessage" NOT NULL,
    "activity_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "MessageAtivity_pkey" PRIMARY KEY ("activity_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Annex_file_name_key" ON "Annex"("file_name");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_parent_activity_id_fkey" FOREIGN KEY ("parent_activity_id") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annex" ADD CONSTRAINT "Annex_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annex" ADD CONSTRAINT "Annex_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageAtivity" ADD CONSTRAINT "MessageAtivity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageAtivity" ADD CONSTRAINT "MessageAtivity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
