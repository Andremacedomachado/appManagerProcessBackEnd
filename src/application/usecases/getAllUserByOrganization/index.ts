import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository";
import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository";
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";
import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";
import { PrismaUserIntegrationRepository } from "../../repositories/implemention/PrismaUserIntegrationRepository";
import { GetAllUserByOrganizationUseCase } from "./GetAllUserByOrganizationUseCase";
import { GetAllUserByOrganizationController } from "./GetAllUserByOrganizationController";

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

const getAllUserByOrganizationUseCase = new GetAllUserByOrganizationUseCase(prismaUserIntegrationRepository);
const getAllUserByOrganizationController = new GetAllUserByOrganizationController(getAllUserByOrganizationUseCase);

export { getAllUserByOrganizationUseCase, getAllUserByOrganizationController }
