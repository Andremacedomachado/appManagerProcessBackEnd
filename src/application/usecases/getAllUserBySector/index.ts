import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository";
import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository";
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";
import { PrismaUserIntegrationRepository } from "../../repositories/implemention/PrismaUserIntegrationRepository";
import { GetAllUserBySectorUseCase } from "./GetAllUserBySectorUseCase";
import { GetAllUserBySectorController } from "./GetAllUserBySectorController";

const prismaUserRepository = new PrismaUserRepository()
const prismaRoleRepository = new PrismaRoleRepository()
const prismaUserOnRoleRepository = new PrismaUserOnRolesRepository()
const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository()

const prismaUserIntegrationRepository = new PrismaUserIntegrationRepository(prismaUserRepository, prismaRoleRepository, prismaUserOnRoleRepository, prismaOrganizationSectorRepository);
const getAllUserBySectorUseCase = new GetAllUserBySectorUseCase(prismaUserIntegrationRepository);
const getAllUserBySectorController = new GetAllUserBySectorController(getAllUserBySectorUseCase);

export { getAllUserBySectorUseCase, getAllUserBySectorController };