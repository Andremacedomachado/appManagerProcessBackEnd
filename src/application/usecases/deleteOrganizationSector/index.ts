import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository"
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository"
import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository"
import { PrismaUserIntegrationRepository } from "../../repositories/implemention/PrismaUserIntegrationRepository"
import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository"
import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository"
import { DeleteOrganizationSectorController } from "./DeleteOrganizationSectorController"
import { DeleteOrganizationSectorUseCase } from "./DeleteOrganizationSectorUseCase"


const prismaUserRepository = new PrismaUserRepository()
const prismaRoleRepository = new PrismaRoleRepository()
const prismaUserOnRoleRepository = new PrismaUserOnRolesRepository()
const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository()
const prismaOrganizationRepository = new PrismaOrganizationRepository()

const prismaUserIntegrationRepository = new PrismaUserIntegrationRepository(prismaUserRepository,
    prismaRoleRepository, prismaUserOnRoleRepository,
    prismaOrganizationSectorRepository,
    prismaOrganizationRepository
);

const deleteOrganizationSectorUseCase = new DeleteOrganizationSectorUseCase(prismaUserIntegrationRepository, prismaOrganizationSectorRepository);

const deleteOrganizationSectorController = new DeleteOrganizationSectorController(deleteOrganizationSectorUseCase);

export { deleteOrganizationSectorUseCase, deleteOrganizationSectorController };