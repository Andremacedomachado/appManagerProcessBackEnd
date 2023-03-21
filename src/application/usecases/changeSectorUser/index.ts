import { PrismaUserRepository } from "../../repositories/implemention/PrismaUserRepository";
import { PrismaRoleRepository } from "../../repositories/implemention/PrismaRoleRepository";
import { PrismaUserOnRolesRepository } from "../../repositories/implemention/PrismaUserOnRolesRepository";
import { PrismaOrganizationRepository } from "../../repositories/implemention/PrismaOrganizationRepository";
import { PrismaOrganizationSectorRepository } from "../../repositories/implemention/PrismaOrganizationSectorRepository";
import { PrismaUserIntegrationRepository } from "../../repositories/implemention/PrismaUserIntegrationRepository";
import { ChangeSectorUserUseCase } from "./ChangeSectorUserUseCase";
import { ChangeSectorUserController } from "./ChangeSectorUserController";


const prismaUserRepository = new PrismaUserRepository();
const prismaRoleRepository = new PrismaRoleRepository();
const prismaUserOnRoleRepository = new PrismaUserOnRolesRepository();
const prismaOrganizationSectorRepository = new PrismaOrganizationSectorRepository();
const prismaOrganizationRepository = new PrismaOrganizationRepository();

const prismaUserIntegrationRepository = new PrismaUserIntegrationRepository(
    prismaUserRepository,
    prismaRoleRepository,
    prismaUserOnRoleRepository,
    prismaOrganizationSectorRepository,
    prismaOrganizationRepository
);

const changeSectorUserUseCase = new ChangeSectorUserUseCase(prismaUserIntegrationRepository);
const changeSectorUserController = new ChangeSectorUserController(changeSectorUserUseCase);

export { changeSectorUserUseCase, changeSectorUserController };
