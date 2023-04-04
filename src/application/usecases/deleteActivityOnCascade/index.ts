import { PrismaActivityRelationRepository } from "../../repositories/implemention/PrismaActivityRelationRepository"
import { PrismaActivityRepository } from "../../repositories/implemention/PrismaActivityRepository"
import { PrismaAnnexActivityRepository } from "../../repositories/implemention/PrismaAnnexActivityRepository"
import { PrismaCollaboratorRepository } from "../../repositories/implemention/PrismaCollaboratorRepository"
import { PrismaDeleteRecordInterationRepository } from "../../repositories/implemention/PrismaDeleteRecordIntegrationRepository"
import { PrismaMessageActivityRepository } from "../../repositories/implemention/PrismaMessageActivityRepository"
import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository"
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository"
import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository"
import { PrismaUserIntegrationRepository } from "../../repositories/implemention/PrismaUserIntegrationRepository"
import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository"
import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository"
import { DeleteActivityOnCascadeController } from "./DeleteActivityOnCasCadeController"
import { DeleteActivityOnCascadeUseCase } from "./DeleteActivityOnCascadeUseCase"

const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository()
const prismaOrganizationRepository = new PrismaOrganizationRepository()
const prismaUserRepository = new PrismaUserRepository()
const prismaUserOnRoleRepository = new PrismaUserOnRolesRepository()
const prismaRoleRepository = new PrismaRoleRepository()
const prismaCollaboratorRepository = new PrismaCollaboratorRepository()
const prismaActivityRepository = new PrismaActivityRepository()
const prismaActivityRelationRepository = new PrismaActivityRelationRepository()
const prismaMessagaActivityRepository = new PrismaMessageActivityRepository()
const prismaAnnexActivityRepository = new PrismaAnnexActivityRepository()

const userIntegrationRepository = new PrismaUserIntegrationRepository(
    prismaUserRepository, prismaRoleRepository, prismaUserOnRoleRepository, prismaOrganizationSectorRepository, prismaOrganizationRepository
)

const prismaDeleteRecordInterationRepository = new PrismaDeleteRecordInterationRepository(
    prismaOrganizationSectorRepository,
    prismaOrganizationRepository,
    prismaUserRepository,
    userIntegrationRepository,
    prismaUserOnRoleRepository,
    prismaRoleRepository,
    prismaCollaboratorRepository,
    prismaActivityRepository,
    prismaActivityRelationRepository,
    prismaMessagaActivityRepository,
    prismaAnnexActivityRepository
)

const deleteActivityOnCascadeUseCase = new DeleteActivityOnCascadeUseCase(prismaDeleteRecordInterationRepository);
const deleteActivityOnCascadeController = new DeleteActivityOnCascadeController(deleteActivityOnCascadeUseCase);

export { deleteActivityOnCascadeUseCase, deleteActivityOnCascadeController }