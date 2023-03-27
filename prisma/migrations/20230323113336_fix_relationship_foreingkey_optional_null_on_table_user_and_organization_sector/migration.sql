-- DropForeignKey
ALTER TABLE "organization_sector" DROP CONSTRAINT "organization_sector_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organization_sector_id_fkey";

-- AlterTable
ALTER TABLE "organization_sector" ALTER COLUMN "organization_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "organization_sector_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_sector_id_fkey" FOREIGN KEY ("organization_sector_id") REFERENCES "organization_sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_sector" ADD CONSTRAINT "organization_sector_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
