import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository";
import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository";
import { PrismaUserIntegrationRepository } from "../../repositories/implemention/PrismaUserIntegrationRepository";

import { GetUserByIdController } from "./GetUserByIdController";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";

const prismaUserRepository = new PrismaUserRepository();
const prismaRoleRepository = new PrismaRoleRepository();
const prismaUserOnRoleRepository = new PrismaUserOnRolesRepository()
const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository();

const prismaUserIntegrationRepository = new PrismaUserIntegrationRepository(
    prismaUserRepository, prismaRoleRepository, prismaUserOnRoleRepository, prismaOrganizationSectorRepository
)

const getUserByIdUseCase = new GetUserByIdUseCase(prismaUserIntegrationRepository);
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

export { getUserByIdUseCase, getUserByIdController };