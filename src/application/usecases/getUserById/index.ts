import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository";
import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository";
import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";
import { PrismaUserIntegrationRepository } from "../../repositories/implemention/PrismaUserIntegrationRepository";

import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

const prismaUserRepository = new PrismaUserRepository();
const prismaRoleRepository = new PrismaRoleRepository();
const prismaUserOnRoleRepository = new PrismaUserOnRolesRepository()
const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository();
const prismaOrganizationRepository = new PrismaOrganizationRepository()

const prismaUserIntegrationRepository = new PrismaUserIntegrationRepository(
    prismaUserRepository, prismaRoleRepository, prismaUserOnRoleRepository, prismaOrganizationSectorRepository, prismaOrganizationRepository
)

const getUserByIdUseCase = new GetUserByIdUseCase(prismaUserIntegrationRepository);
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

export { getUserByIdUseCase, getUserByIdController };